const express = require('express');
const router = express.Router();
const prisma = require('../db/prismaClient');

// GET /api/v1/startups
router.get('/', async (req, res, next) => {
  try {
    const startups = await prisma.startup.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(startups);
  } catch (err) { next(err); }
});

// GET /api/v1/startups/:id
router.get('/:id', async (req, res, next) => {
  try {
    const startup = await prisma.startup.findUnique({ where: { id: req.params.id } });
    if (!startup) return res.status(404).json({ error: { message: 'Startup not found' } });
    res.json(startup);
  } catch (err) { next(err); }
});

// POST /api/v1/startups
router.post('/', async (req, res, next) => {
  try {
    const { name, description, createdById } = req.body;
    if (!name) return res.status(400).json({ error: { message: 'Name is required' } });
    const newStartup = await prisma.startup.create({ data: { name, description, createdById } });
    res.status(201).json(newStartup);
  } catch (err) { next(err); }
});

// PUT /api/v1/startups/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const updated = await prisma.startup.update({ where: { id: req.params.id }, data: { name, description } });
    res.json(updated);
  } catch (err) { next(err); }
});

// DELETE /api/v1/startups/:id
router.delete('/:id', async (req, res, next) => {
  try {
    await prisma.startup.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) { next(err); }
});

// GET /api/v1/startups/:id/projects
router.get('/:id/projects', async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany({ where: { startupId: req.params.id }, include: { members: { include: { user: true } }, tasks: true } });
    res.json(projects);
  } catch (err) { next(err); }
});

module.exports = router;
