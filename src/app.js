const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/student.routes');
const logger = require('./middlewares/logger.middleware');
const errorHandler = require('./middlewares/error.middleware');
const notFound = require('./middlewares/notFound.middleware');

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(logger);

// Routes
app.use('/api/students', studentRoutes);

// Simple students endpoint with static data
app.get('/api/students-simple', (req, res) => {
  res.json([
    { id: '1', name: 'John Doe', age: 20, course: 'Computer Science', createdAt: new Date() },
    { id: '2', name: 'Jane Smith', age: 22, course: 'Mathematics', createdAt: new Date() },
    { id: '3', name: 'Bob Johnson', age: 21, course: 'Physics', createdAt: new Date() }
  ]);
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working', timestamp: new Date() });
});

// Main Root Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Student Management System API' });
});

// 404
app.use(notFound);

// Error handler
app.use(errorHandler);

module.exports = app;