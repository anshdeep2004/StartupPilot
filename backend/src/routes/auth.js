const express = require('express');
const router = express.Router();
const prisma = require('../db/prismaClient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST /api/v1/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password, requestedRole } = req.body;
    if (!username || !password) return res.status(400).json({ error: { message: 'username and password required' } });
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(401).json({ error: { message: 'Invalid credentials' } });
    const ok = bcrypt.compareSync(password, user.password || '');
    if (!ok) return res.status(401).json({ error: { message: 'Invalid credentials' } });

    if (requestedRole && user.role !== requestedRole) {
      return res.status(403).json({ error: { message: 'Unauthorized for requested role' } });
    }

    const payload = { sub: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
    const safe = { ...user }; delete safe.password;
    res.json({ token, user: safe });
  } catch (err) { next(err); }
});

module.exports = router;
