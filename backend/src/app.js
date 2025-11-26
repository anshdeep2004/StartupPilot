const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const startupsRouter = require('./routes/startups');
const projectsRouter = require('./routes/projects');
const tasksRouter = require('./routes/tasks');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const aiRouter = require('./routes/ai');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/v1/startups', startupsRouter);
app.use('/api/v1/projects', projectsRouter);
app.use('/api/v1/tasks', tasksRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/ai', aiRouter);

// basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: { message: err.message || 'Internal Server Error' } });
});

module.exports = app;
