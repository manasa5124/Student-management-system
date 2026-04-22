/**
 * Student Service - Real API integration using Fetch
 */
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/students';

// Get auth header with JWT token
const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { 'Authorization': `Bearer ${user.token}` };
  }
  return {};
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  const text = await response.text();
  if (!text) {
    return [];
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error('Failed to parse response:', text);
    throw new Error('Invalid response from server');
  }
};

export const studentService = {
  // GET all students
  getAllStudents: async () => {
    const response = await fetch(API_URL, {
      headers: { ...getAuthHeader() },
    });
    return handleResponse(response);
  },

  // GET student by ID
  getStudentById: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      headers: { ...getAuthHeader() },
    });
    return handleResponse(response);
  },

  // CREATE student
  createStudent: async (studentData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(studentData),
    });
    return handleResponse(response);
  },

  // UPDATE student
  updateStudent: async (id, updatedData) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(updatedData),
    });
    return handleResponse(response);
  },

  // DELETE student
  deleteStudent: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() },
    });
    return handleResponse(response);
  },
};
