const studentService = require('../services/student.service');

exports.getAll = async (req, res, next) => {
  try {
    const students = await studentService.getAllStudents(req.query || {});
    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const student = await studentService.getStudentById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    // Convert age to number if it's a string
    const studentData = {
      ...req.body,
      age: parseInt(req.body.age)
    };
    const student = await studentService.createStudent(studentData);
    
    // Emit WebSocket event
    if (global.io) {
      global.io.emit('student:created', student);
    }
    
    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    // Convert age to number if it's a string
    const studentData = {
      ...req.body,
      age: parseInt(req.body.age)
    };
    const student = await studentService.updateStudent(req.params.id, studentData);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Emit WebSocket event
    if (global.io) {
      global.io.emit('student:updated', student);
    }

    res.status(200).json(student);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const deleted = await studentService.deleteStudent(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Emit WebSocket event
    if (global.io) {
      global.io.emit('student:deleted', { id: req.params.id });
    }

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    next(err);
  }
};