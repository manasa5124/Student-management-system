import { mockStudents } from "./MockData";

/**
 * Student Service - Simulates API calls to a backend.
 * 
 * DESIGN PRINCIPLE:
 * By encapsulating data logic in a service, we make the frontend agnostic of the data source.
 * When real APIs are ready, we only need to update this file.
 */

// Simulated database state for this session
let students = [...mockStudents];

const DELAY = 800; // Simulated network delay in ms

export const studentService = {
  // GET all students
  getAllStudents: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...students]);
      }, DELAY);
    });
  },

  // GET student by ID
  getStudentById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const student = students.find((s) => s.id === id);
        if (student) resolve({ ...student });
        else reject(new Error("Student not found"));
      }, DELAY);
    });
  },

  // CREATE student
  createStudent: async (studentData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newStudent = {
          ...studentData,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
        };
        students = [newStudent, ...students];
        resolve(newStudent);
      }, DELAY);
    });
  },

  // UPDATE student
  updateStudent: async (id, updatedData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = students.findIndex((s) => s.id === id);
        if (index !== -1) {
          students[index] = { ...students[index], ...updatedData };
          resolve(students[index]);
        } else {
          reject(new Error("Student not found"));
        }
      }, DELAY);
    });
  },

  // DELETE student
  deleteStudent: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        students = students.filter((s) => s.id !== id);
        resolve({ success: true });
      }, DELAY);
    });
  },
};
