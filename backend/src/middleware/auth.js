const jwt = require('jsonwebtoken');
const prisma = require('../db/prismaClient');

const authenticate = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: { message: 'Unauthorized' } });
    const token = auth.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) return res.status(401).json({ error: { message: 'User not found' } });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: { message: 'Invalid token' } });
  }
};

const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: { message: 'Unauthorized' } });
    if (req.user.role !== role) return res.status(403).json({ error: { message: 'Forbidden' } });
    next();
  };
};

module.exports = { authenticate, requireRole };
