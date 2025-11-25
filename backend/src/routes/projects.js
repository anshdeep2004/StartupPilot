const express = require('express');
const router = express.Router();
const prisma = require('../db/prismaClient');

// GET /api/v1/projects
router.get('/', async (req, res, next) => {
  try {
    const { startupId } = req.query;
    const where = startupId ? { startupId } : {};
    const projects = await prisma.project.findMany({ where, include: { members: { include: { user: true } }, tasks: true } });
    res.json(projects);
  } catch (err) { next(err); }
});

// GET /api/v1/projects/:id
router.get('/:id', async (req, res, next) => {
  try {
    const project = await prisma.project.findUnique({ where: { id: req.params.id }, include: { members: { include: { user: true } }, tasks: true } });
    if (!project) return res.status(404).json({ error: { message: 'Project not found' } });
    res.json(project);
  } catch (err) { next(err); }
});

// POST /api/v1/projects
router.post('/', async (req, res, next) => {
  try {
    const { name, startDate, shortDesc, longDesc, memberIds, startupId } = req.body;
    if (!name) return res.status(400).json({ error: { message: 'Name is required' } });
    const project = await prisma.project.create({ data: { name, startDate: startDate ? new Date(startDate) : null, shortDesc, longDesc, startupId } });
    if (Array.isArray(memberIds) && memberIds.length) {
      const pmCreates = memberIds.map((userId) => ({ projectId: project.id, userId }));
      await prisma.projectMember.createMany({ data: pmCreates });
    }
    const created = await prisma.project.findUnique({ where: { id: project.id }, include: { members: { include: { user: true } } } });
    res.status(201).json(created);
  } catch (err) { next(err); }
});

// PUT /api/v1/projects/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { name, startDate, shortDesc, longDesc } = req.body;
    const updated = await prisma.project.update({ where: { id: req.params.id }, data: { name, startDate: startDate ? new Date(startDate) : null, shortDesc, longDesc } });
    res.json(updated);
  } catch (err) { next(err); }
});

// POST /api/v1/projects/:id/members
router.post('/:id/members', async (req, res, next) => {
  try {
    const { userId, role } = req.body;
    const pm = await prisma.projectMember.create({ data: { projectId: req.params.id, userId, role } });
    res.status(201).json(pm);
  } catch (err) { next(err); }
});

// DELETE /api/v1/projects/:id/members/:userId
router.delete('/:id/members/:userId', async (req, res, next) => {
  try {
    await prisma.projectMember.deleteMany({ where: { projectId: req.params.id, userId: req.params.userId } });
    res.status(204).send();
  } catch (err) { next(err); }
});

// DELETE project
router.delete('/:id', async (req, res, next) => {
  try {
    await prisma.project.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) { next(err); }
});

module.exports = router;