const API_URL = 'http://localhost:3001/api/auth';

export const authService = {
  signup: async (userData) => {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Signup failed');
    
    if (data.token) {
      localStorage.setItem('user', JSON.stringify(data));
    }
    return data;
  },

  login: async (credentials) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');
    
    if (data.token) {
      localStorage.setItem('user', JSON.stringify(data));
    }
    return data;
  },

  logout: () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },

  getAuthHeader: () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
    return {};
  }
};
