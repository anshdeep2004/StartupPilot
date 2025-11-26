import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import http from "../api/http";

const AIAssistance = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramStartupId = searchParams.get("startupId");

  const [startups, setStartups] = useState([]);
  const [selectedStartupId, setSelectedStartupId] = useState(paramStartupId || null);

  const [analysisRes, setAnalysisRes] = useState(null);
  const [error, setError] = useState(null);
  const [loadingMap, setLoadingMap] = useState({});

  const setLoadingFor = (id, value) =>
    setLoadingMap((prev) => ({ ...prev, [id]: value }));

  // Fetch startups list on mount
  useEffect(() => {
    let mounted = true;
    const fetchStartups = async () => {
      try {
        const res = await http.get("/startups");
        if (!mounted) return;
        setStartups(res.data || []);
      } catch (err) {
        console.error("Failed to fetch startups:", err);
      }
    };
    fetchStartups();
    return () => (mounted = false);
  }, []);

  // Keep selectedStartupId in sync with query param
  useEffect(() => {
    if (paramStartupId && paramStartupId !== selectedStartupId) {
      setSelectedStartupId(paramStartupId);
    }
  }, [paramStartupId, selectedStartupId]);

  // Fetch AI analysis when selectedStartupId changes
  useEffect(() => {
    if (!selectedStartupId) return;

    // update query param for deep-linking
    setSearchParams({ startupId: selectedStartupId });

    const controller = new AbortController();
    const fetchAnalysis = async () => {
      setLoadingFor(selectedStartupId, true);
      setError(null);
      try {
        const res = await http.get(`/ai/startup/${selectedStartupId}/analysis?ts=${Date.now()}`, {
          signal: controller.signal,
        });
        setAnalysisRes(res.data);
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error("Failed to fetch AI analysis:", err);
          setError("Could not fetch AI analysis. Please try again.");
          setAnalysisRes(null);
        }
      } finally {
        setLoadingFor(selectedStartupId, false);
      }
    };

    fetchAnalysis();
    return () => controller.abort(); // cancel previous fetch if startup changes
  }, [selectedStartupId, setSearchParams]);

  const onSelectStartup = (id) => setSelectedStartupId(String(id));

  const onRefresh = async () => {
    if (!selectedStartupId) return;
    setLoadingFor(selectedStartupId, true);
    setError(null);
    try {
      const res = await http.get(`/ai/startup/${selectedStartupId}/analysis?ts=${Date.now()}`);
      setAnalysisRes(res.data);
    } catch (err) {
      console.error("Refresh failed:", err);
      setError("Could not refresh analysis");
      setAnalysisRes(null);
    } finally {
      setLoadingFor(selectedStartupId, false);
    }
  };

  const loading = loadingMap[selectedStartupId] || false;

  return (
    <div className="bg-[#faf5ff] min-h-screen px-6 py-6 text-black">
      <div className="flex gap-6">
        {/* Left: startups list */}
        <div className="w-72 bg-white rounded-xl p-4 shadow h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Startups</h3>
            {/* <button
              className="text-sm bg-white text-black"
              onClick={async () => {
                try {
                  const res = await http.get("/startups");
                  setStartups(res.data || []);
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              Refresh
            </button> */}
          </div>

          {startups.length === 0 && (
            <div className="text-sm text-gray-500">No startups found</div>
          )}

          <ul className="space-y-2">
            {startups.map((s) => (
              <li
                key={s.id}
                onClick={() => onSelectStartup(s.id)}
                className={`p-3 rounded-lg cursor-pointer ${
                  String(selectedStartupId) === String(s.id)
                    ? "bg-purple-50 border border-purple-200"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="font-medium text-gray-900">{s.name}</div>
                <div className="text-xs text-gray-500">
                  {s.description || s.tagline || s.type || ""}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: analysis panel */}
        <div className="flex-1">
          {!selectedStartupId && (
            <div className="bg-white rounded-xl p-8 shadow">
              Select a startup to view AI assistance
            </div>
          )}

          {loading && (
            <div className="bg-white rounded-xl p-8 shadow">
              Analyzing startup health...
            </div>
          )}

          {error && (
            <div className="bg-white rounded-xl p-8 shadow text-red-600">
              {error}
            </div>
          )}

          {analysisRes && !loading && (
            <AnalysisPanel analysisRes={analysisRes} onRefresh={onRefresh} />
          )}
        </div>
      </div>
    </div>
  );
};

// Extracted analysis panel to simplify JSX
const AnalysisPanel = ({ analysisRes, onRefresh }) => {
  const { summary, analysis: aiAnalysis, cached } = analysisRes;

  const getHealthColor = (score) => {
    if (score < 4) return "bg-red-100 border-red-400 text-red-900";
    if (score < 7) return "bg-yellow-100 border-yellow-400 text-yellow-900";
    return "bg-green-100 border-green-400 text-green-900";
  };

  const getHealthBgColor = (score) => {
    if (score < 4) return "bg-red-500";
    if (score < 7) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{summary.startupName}</h1>
          <p className="text-sm text-gray-600">AI-Powered Health Analysis</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="px-3 py-2 bg-white border rounded shadow"
            onClick={onRefresh}
          >
            Refresh
          </button>
          <div className="text-sm text-gray-500">{cached ? "Cached" : "Live"}</div>
        </div>
      </div>

    

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Tasks" value={summary.totalTasks} />
        <StatCard title="Completed" value={summary.completed} color="green" />
        <StatCard title="In Progress" value={summary.inProgress} color="blue" />
        <StatCard title="Completion Rate" value={`${summary.completionRate}%`} color="purple" />
      </div>

      <Section title="Areas Performing Well" items={aiAnalysis.areasPerformingWell} color="green" />
      <Section title="Areas Needing Attention" items={aiAnalysis.areasNeedingAttention} color="yellow" />
      {aiAnalysis.bottlenecks?.length > 0 && <Section title="Bottlenecks" items={aiAnalysis.bottlenecks} color="red" />}
      {aiAnalysis.risks?.length > 0 && <Section title="Risks" items={aiAnalysis.risks} color="orange" />}
      {aiAnalysis.overloadedUsers?.length > 0 && <Section title="Overloaded Users" items={aiAnalysis.overloadedUsers} color="pink" />}
      <Section title="Suggestions" items={aiAnalysis.suggestions} color="blue" />
      <OrderedSection title="Next Steps" items={aiAnalysis.nextSteps} color="purple" />

      {summary.users?.length > 0 && <TeamTable users={summary.users} />}
      {summary.projects?.length > 0 && <ProjectStatus projects={summary.projects} />}
    </div>
  );
};

// Small reusable components
const StatCard = ({ title, value, color = "gray" }) => {
  const colorMap = {
    green: "text-green-600",
    blue: "text-blue-600",
    purple: "text-purple-600",
    gray: "text-gray-900",
  };
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <p className="text-gray-600 text-sm">{title}</p>
      <p className={`text-2xl font-bold ${colorMap[color] || colorMap.gray}`}>{value}</p>
    </div>
  );
};

const Section = ({ title, items = [], color = "gray" }) => {
  const colors = {
    green: "bg-white rounded-xl p-6 shadow mb-8",
    yellow: "bg-white rounded-xl p-6 shadow mb-8",
    red: "bg-red-50 rounded-xl p-6 shadow mb-8 border border-red-200",
    orange: "bg-orange-50 rounded-xl p-6 shadow mb-8 border border-orange-200",
    pink: "bg-pink-50 rounded-xl p-6 shadow mb-8 border border-pink-200",
    blue: "bg-blue-50 rounded-xl p-6 shadow mb-8 border border-blue-200",
    purple: "bg-purple-50 rounded-xl p-6 shadow mb-8 border border-purple-200",
    gray: "bg-white rounded-xl p-6 shadow mb-8",
  };
  return (
    <div className={colors[color] || colors.gray}>
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <span className="text-2xl mr-2">→</span> {title}
      </h2>
      <ul className="space-y-2">
        {items.map((it, idx) => (
          <li key={idx} className="text-gray-700 flex items-start">
            <span className="text-green-500 mr-3 mt-1">→</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const OrderedSection = ({ title, items = [] }) => (
  <div className="bg-white rounded-xl p-6 shadow mb-8">
    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
      <span className="text-2xl mr-2"></span> {title}
    </h2>
    <ol className="space-y-2">
      {items.map((it, idx) => (
        <li key={idx} className="text-gray-800 flex items-start">
          <span className="text-gray-500 mr-3 mt-1 font-bold">{idx + 1}.</span>
          <span>{it}</span>
        </li>
      ))}
    </ol>
  </div>
);

const TeamTable = ({ users }) => (
  <div className="bg-white rounded-xl p-6 shadow">
    <h2 className="text-xl font-bold text-gray-900 mb-4">Team Performance</h2>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="text-left p-3 text-gray-700">User</th>
            <th className="text-center p-3 text-gray-700">Assigned</th>
            <th className="text-center p-3 text-gray-700">Completed</th>
            <th className="text-center p-3 text-gray-700">Completion %</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="p-3 text-gray-800 font-medium">{user.name}</td>
              <td className="text-center p-3 text-gray-600">{user.assigned}</td>
              <td className="text-center p-3 text-gray-600">{user.completed}</td>
              <td className="text-center p-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    user.completionRate > 75
                      ? "bg-green-100 text-green-800"
                      : user.completionRate > 50
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.completionRate}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ProjectStatus = ({ projects }) => (
  <div className="bg-white rounded-xl p-6 shadow">
    <h2 className="text-xl font-bold text-gray-900 mb-4">Project Status</h2>
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-900">{project.name}</h3>
            <span className="text-sm font-bold text-gray-600">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                project.progress > 75
                  ? "bg-green-500"
                  : project.progress > 50
                  ? "bg-blue-500"
                  : "bg-orange-500"
              }`}
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {project.completedTasks} of {project.totalTasks} tasks completed
            {project.delays > 0 && (
              <span className="text-red-600 ml-2">• {project.delays} delayed</span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AIAssistance;