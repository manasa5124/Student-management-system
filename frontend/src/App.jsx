import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import StudentFormPage from './pages/StudentFormPage';

/**
 * Main Application Component
 * 
 * REACT CONCEPT: Virtual DOM (Concept Explanation)
 * React uses a Virtual DOM to minimize actual DOM manipulations. 
 * When state changes (e.g., adding a student), React calculates the diff 
 * between the new VDOM and old VDOM, then updates only the necessary parts 
 * of the real DOM. This makes UI updates extremely fast and efficient.
 */
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<StudentFormPage />} />
            <Route path="/edit/:id" element={<StudentFormPage />} />
          </Routes>
        </main>
        
        <footer className="bg-white border-t border-gray-100 py-8">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            <p>&copy; 2026 EduManage System. Built with modern React principles.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
