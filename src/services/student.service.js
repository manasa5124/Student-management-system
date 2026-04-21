const Student = require('../models/student.model');

const getAllStudents = async (query) => {
  const { name, page = 1, limit = 5 } = query;
  
  const filter = {};
  if (name) {
    filter.name = { $regex: name, $options: 'i' }; // Case-insensitive search
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  
  return await Student.find(filter)
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });
};

const getStudentById = async (id) => {
  return await Student.findById(id);
};

const createStudent = async (data) => {
  return await Student.create(data);
};

const updateStudent = async (id, data) => {
  return await Student.findByIdAndUpdate(id, data, {
    new: true, // Return the updated document
    runValidators: true, // Run schema validators on update
  });
};

const deleteStudent = async (id) => {
  const student = await Student.findByIdAndDelete(id);
  return !!student;
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};