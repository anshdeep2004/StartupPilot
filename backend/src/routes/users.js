const express = require('express');
const router = express.Router();
const prisma = require('../db/prismaClient');

// GET /api/v1/users
router.get('/', async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) { next(err); }
});

// GET /api/v1/users/:id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    if (!user) return res.status(404).json({ error: { message: 'User not found' } });
    res.json(user);
  } catch (err) { next(err); }
});

// POST /api/v1/users
router.post('/', async (req, res, next) => {
  try {
    const { name, email, role } = req.body;
    if (!name) return res.status(400).json({ error: { message: 'Name is required' } });
    const user = await prisma.user.create({ data: { name, email, role } });
    res.status(201).json(user);
  } catch (err) { next(err); }
});

// PUT /api/v1/users/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { name, email, role } = req.body;
    const user = await prisma.user.update({ where: { id: req.params.id }, data: { name, email, role } });
    res.json(user);
  } catch (err) { next(err); }
});

// DELETE /api/v1/users/:id
router.delete('/:id', async (req, res, next) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) { next(err); }
});

module.exports = router;
