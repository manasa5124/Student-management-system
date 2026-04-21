const studentService = require('../services/student.service');

exports.getAll = async (req, res, next) => {
  try {
    const students = await studentService.getAllStudents(req.query);
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
    const student = await studentService.createStudent(req.body);
    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const student = await studentService.updateStudent(req.params.id, req.body);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
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

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    next(err);
  }
};