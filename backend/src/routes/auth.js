const express = require('express');
const router = express.Router();
const prisma = require('../db/prismaClient');
const bcrypt = require('bcryptjs');

// POST /api/v1/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: { message: 'username and password required' } });
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(401).json({ error: { message: 'Invalid credentials' } });
    const ok = bcrypt.compareSync(password, user.password || '');
    if (!ok) return res.status(401).json({ error: { message: 'Invalid credentials' } });
    const safe = { ...user }; delete safe.password;
    res.json(safe);
  } catch (err) { next(err); }
});

module.exports = router;
