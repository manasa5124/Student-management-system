const Student = require('../models/student.model');
const generateId = require('../utils/idGenerator');
const { readData, writeData } = require('../utils/fileHandler');

let students = readData(); // in-memory + persisted

const getAllStudents = (query) => {
  let result = [...students];

  // Search
  if (query.name) {
    result = result.filter(s =>
      s.name.toLowerCase().includes(query.name.toLowerCase())
    );
  }

  // Pagination
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 5;
  const start = (page - 1) * limit;
  const end = start + limit;

  return result.slice(start, end);
};

const getStudentById = (id) => {
  return students.find(s => s.id === id);
};

const createStudent = (data) => {
  const newStudent = new Student({
    id: generateId(),
    ...data
  });

  students.push(newStudent);
  writeData(students);

  return newStudent;
};

const updateStudent = (id, data) => {
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return null;

  students[index] = { ...students[index], ...data };
  writeData(students);

  return students[index];
};

const deleteStudent = (id) => {
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return false;

  students.splice(index, 1);
  writeData(students);

  return true;
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};