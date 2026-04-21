const express = require('express');
const studentRoutes = require('./routes/student.routes');
const logger = require('./middlewares/logger.middleware');
const errorHandler = require('./middlewares/error.middleware');
const notFound = require('./middlewares/notFound.middleware');

const app = express();

// Custom middleware
app.use(logger);

// Built-in middleware
app.use(express.json());

// Main Root Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Student Management System API' });
});

// Routes
app.use('/api/students', studentRoutes);

// 404
app.use(notFound);

// Error handler
app.use(errorHandler);

module.exports = app;