// src/routes/ai.js
const express = require('express');
const axios = require('axios');
const prisma = require('../db/prismaClient');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Simple in-memory cache
const analysisCache = new Map();
const CACHE_TTL_MS = (process.env.AI_CACHE_TTL_SEC ? parseInt(process.env.AI_CACHE_TTL_SEC) : 3600) * 1000;

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434/api/generate';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'phi3';

function parseAIResponse(text) {
  // Extract values using the new format with pipes (|) as delimiters
  const extractLine = (label) => {
    const regex = new RegExp(`${label}:\\s*(.+?)(?:\\n|$)`, "i");
    const match = text.match(regex);
    return match ? match[1].trim() : null;
  };

  const extractList = (label) => {
    const regex = new RegExp(`${label}:\\s*(.+?)(?:\\n|$)`, "i");
    const match = text.match(regex);
    if (!match) return [];
    return match[1]
      .split("|")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  const healthScoreStr = extractLine("HEALTH_SCORE");
  const healthScore = healthScoreStr ? parseInt(healthScoreStr) : 50;

  return {
    healthScore: Math.min(Math.max(healthScore, 0), 100), // Clamp 0-100
    healthStatus: extractLine("HEALTH_STATUS") || "Moderate",
    summary: extractLine("SUMMARY") || "Startup analysis in progress",
    areasPerformingWell: extractList("PERFORMING_WELL") || ["Good task tracking"],
    areasNeedingAttention: extractList("NEEDS_ATTENTION") || ["Monitor progress"],
    bottlenecks: extractList("BOTTLENECKS") || ["Resource constraints"],
    risks: extractList("RISKS") || ["Timeline risks"],
    overloadedUsers: [],
    suggestions: extractList("SUGGESTIONS") || ["Increase team collaboration"],
    nextSteps: extractList("NEXT_STEPS") || ["Review project status"]
  };
}


// ---------------------------------------------------------
// Build a compact startup summary for the LLM
// ---------------------------------------------------------
async function getStartupSummary(id, userId) {
  if (!id) return null;

  const startup = await prisma.startup.findUnique({
    where: { id: String(id) },
    include: {
      projects: { include: { tasks: { include: { assignee: true } } } },
      createdBy: true,
    },
  });

  if (!startup) return null;

  // Allow any authenticated user to view AI analysis for now
  // (You can add more granular permissions later if needed)

  const now = new Date();
  let totalTasks = 0, completed = 0, inProgress = 0, pending = 0, overdue = 0, stalled = 0;
  const projects = [];

  for (const project of startup.projects || []) {
    const proj = { id: project.id, name: project.name, total: 0, completed: 0, overdue: 0 };
    for (const task of project.tasks || []) {
      proj.total++;
      totalTasks++;

      const status = (task.status || '').toLowerCase();

      if (status === 'done' || status === 'completed') { completed++; proj.completed++; }
      else if (status === 'in_progress') { inProgress++; }
      else { pending++; }

      if (task.dueDate && new Date(task.dueDate) < now && status !== 'done') {
        overdue++; proj.overdue++;
      }

      if (status === 'in_progress' && task.updatedAt &&
        ((now - new Date(task.updatedAt)) / (1000 * 60 * 60 * 24) > 3)) {
        stalled++;
      }
    }

    proj.progress = proj.total ? Math.round((proj.completed / proj.total) * 100) : 0;
    projects.push(proj);
  }

  const completionRate = totalTasks ? Math.round((completed / totalTasks) * 100) : 0;

  return {
    startupId: startup.id,
    startupName: startup.name,
    totalTasks,
    completed,
    inProgress,
    pending,
    overdue,
    stalled,
    completionRate,
    projects,
    createdBy: startup.createdBy ? { id: startup.createdBy.id, name: startup.createdBy.name } : null,
  };
}


// ---------------------------------------------------------
// GET /api/v1/ai/startup/:id/analysis
// ---------------------------------------------------------
router.get('/startup/:id/analysis', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!id) return res.status(400).json({ error: "Startup ID missing" });

    const summary = await getStartupSummary(id, userId);

    if (!summary) {
      console.error(`Authorization failed: user ${userId} not allowed to view startup ${id}`);
      return res.status(403).json({ error: 'Not allowed or startup not found' });
    }

    const cacheKey = `ai:${id}`;
    const cached = analysisCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return res.json({ summary, analysis: cached.data, cached: true });
    }

    const prompt = `You are a startup advisor. Analyze this startup and respond with ONLY these exact sections:

HEALTH_SCORE: (0-100 number)
HEALTH_STATUS: (one short phrase like "Good" or "Needs Attention")
SUMMARY: (1-2 sentences about the startup health)
PERFORMING_WELL: item1 | item2 | item3
NEEDS_ATTENTION: item1 | item2 | item3
BOTTLENECKS: item1 | item2 | item3
RISKS: item1 | item2 | item3
SUGGESTIONS: item1 | item2 | item3
NEXT_STEPS: item1 | item2 | item3

Startup data:
Name: ${summary.startupName}
Total Tasks: ${summary.totalTasks}
Completed: ${summary.completed}
In Progress: ${summary.inProgress}
Completion Rate: ${summary.completionRate}%
Overdue Tasks: ${summary.overdue}
Stalled Tasks: ${summary.stalled}
Projects: ${summary.projects.map(p => p.name).join(", ")}

Respond with ONLY the sections above, nothing else.`;

    console.log(`Calling Ollama at ${OLLAMA_URL} with model ${OLLAMA_MODEL}...`);
    const resp = await axios.post(
      OLLAMA_URL,
      { model: OLLAMA_MODEL, prompt, stream: false },
      { timeout: 120000 }
    );

    const rawText = resp.data.response || resp.data;
    console.log('Raw Ollama response:', rawText.substring(0, 200)); // Log first 200 chars
    const analysis = parseAIResponse(rawText);

    console.log('Parsed analysis:', JSON.stringify(analysis).substring(0, 200));

    analysisCache.set(cacheKey, {
      data: analysis,
      expiresAt: Date.now() + CACHE_TTL_MS
    });

    res.json({ summary, analysis, cached: false });

  } catch (err) {
    console.error('AI analysis error:', err.message || err);
    console.error('Error stack:', err.stack);
    res.status(500).json({ error: 'Failed to analyze startup', details: err.message });
  }
});


// ---------------------------------------------------------
// GET /api/v1/ai/project/:id/analysis
// ---------------------------------------------------------
router.get('/project/:id/analysis', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const project = await prisma.project.findUnique({
      where: { id: String(id) },
      include: {
        startup: { include: { createdBy: true } },
        tasks: { include: { assignee: true } }
      }
    });

    if (!project) return res.status(404).json({ error: "Project not found" });

    // Allow any authenticated user to view project analysis
    // (You can add more granular permissions later if needed)

    const now = new Date();
    let total = 0, completed = 0, inProgress = 0, pending = 0, overdue = 0;

    for (const t of project.tasks) {
      total++;

      const s = (t.status || "").toLowerCase();
      if (s === "done" || s === "completed") completed++;
      else if (s === "in_progress") inProgress++;
      else pending++;

      if (t.dueDate && new Date(t.dueDate) < now && s !== "done") overdue++;
    }

    const summary = {
      projectId: project.id,
      projectName: project.name,
      startupName: project.startup?.name || "Unknown",
      totalTasks: total,
      completed,
      inProgress,
      pending,
      overdue,
      tasks: project.tasks.map(t => ({
        id: t.id,
        title: t.title,
        status: t.status,
        assignee: t.assignee ? t.assignee.name : "Unassigned",
        dueDate: t.dueDate
      }))
    };

    const cacheKey = `ai_project:${id}`;
    const cached = analysisCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return res.json({ summary, analysis: cached.data, cached: true });
    }

    const prompt = `
You are an expert project advisor.

Analyze this project and provide:
- Health Score (0–100)
- Health Status (one line)
- Summary (2–3 lines)
- 3 Bottlenecks
- 3 Risks
- 3 Suggestions
- 3 Next Steps

Project summary:
${JSON.stringify(summary, null, 2)}
`;

    const resp = await axios.post(
      OLLAMA_URL,
      { model: OLLAMA_MODEL, prompt, stream: false },
      { timeout: 60000 }
    );

    const rawText = resp.data.response || resp.data;
    const analysis = parseAIResponse(rawText);

    analysisCache.set(cacheKey, {
      data: analysis,
      expiresAt: Date.now() + CACHE_TTL_MS
    });

    res.json({ summary, analysis, cached: false });

  } catch (err) {
    console.error("AI project analysis error:", err.message || err);
    res.status(500).json({ error: "Failed to analyze project" });
  }
});


module.exports = router;
