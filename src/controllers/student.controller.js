const studentService = require('../services/student.service');

exports.getAll = (req, res, next) => {
  try {
    const students = studentService.getAllStudents(req.query);
    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
};

exports.getById = (req, res, next) => {
  try {
    const student = studentService.getStudentById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (err) {
    next(err);
  }
};

exports.create = (req, res, next) => {
  try {
    const student = studentService.createStudent(req.body);
    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
};

exports.update = (req, res, next) => {
  try {
    const student = studentService.updateStudent(req.params.id, req.body);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (err) {
    next(err);
  }
};

exports.delete = (req, res, next) => {
  try {
    const deleted = studentService.deleteStudent(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    next(err);
  }
};