const express = require('express');
const router = express.Router();
const prisma = require('../db/prismaClient');

// GET /api/v1/projects/:projectId/tasks (optional project scoped)
router.get('/project/:projectId', async (req, res, next) => {
  try {
    const tasks = await prisma.task.findMany({ where: { projectId: req.params.projectId }, include: { assignee: true } });
    res.json(tasks);
  } catch (err) { next(err); }
});

// GET /api/v1/tasks/:id
router.get('/:id', async (req, res, next) => {
  try {
    const task = await prisma.task.findUnique({ where: { id: req.params.id }, include: { assignee: true } });
    if (!task) return res.status(404).json({ error: { message: 'Task not found' } });
    res.json(task);
  } catch (err) { next(err); }
});

// POST /api/v1/projects/:projectId/tasks -> create
router.post('/project/:projectId', async (req, res, next) => {
  try {
    const { title, description, status, assigneeId, dueDate, orderIndex } = req.body;
    if (!title) return res.status(400).json({ error: { message: 'Title required' } });
    const created = await prisma.task.create({ data: { projectId: req.params.projectId, title, description, status: status || 'todo', assigneeId, dueDate: dueDate ? new Date(dueDate) : null, orderIndex } });
    res.status(201).json(created);
  } catch (err) { next(err); }
});

// PUT /api/v1/tasks/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { title, description, status, assigneeId, orderIndex } = req.body;
    const updated = await prisma.task.update({ where: { id: req.params.id }, data: { title, description, status, assigneeId, orderIndex } });
    res.json(updated);
  } catch (err) { next(err); }
});

// DELETE /api/v1/tasks/:id
router.delete('/:id', async (req, res, next) => {
  try {
    await prisma.task.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) { next(err); }
});

// PATCH bulk reorder
router.patch('/reorder', async (req, res, next) => {
  try {
    const { updates } = req.body; // [{id, status, orderIndex}]
    if (!Array.isArray(updates)) return res.status(400).json({ error: { message: 'updates must be array' } });
    const tx = updates.map(u => prisma.task.update({ where: { id: u.id }, data: { status: u.status, orderIndex: u.orderIndex } }));
    const result = await prisma.$transaction(tx);
    res.json(result);
  } catch (err) { next(err); }
});

module.exports = router;
