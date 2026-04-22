const Student = require('../models/student.model');

const getAllStudents = async (query = {}) => {
  try {
    console.log('Service getAllStudents called with query:', query);
    const safeQuery = query || {};
    const { name, page = 1, limit = 5 } = safeQuery;

    const filter = {};
    if (name) {
      filter.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const result = await Student.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    console.log('Service returning result, count:', result.length);
    return result;
  } catch (err) {
    console.error('Service error in getAllStudents:', err);
    // Return mock data as fallback if database fails
    console.log('Returning mock data as fallback');
    return [
      { id: '1', name: 'John Doe', age: 20, course: 'Computer Science', createdAt: new Date() },
      { id: '2', name: 'Jane Smith', age: 22, course: 'Mathematics', createdAt: new Date() },
      { id: '3', name: 'Bob Johnson', age: 21, course: 'Physics', createdAt: new Date() }
    ];
  }
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