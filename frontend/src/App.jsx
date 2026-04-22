import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import StudentFormPage from './pages/StudentFormPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<StudentFormPage />} />
            <Route path="/edit/:id" element={<StudentFormPage />} />
          </Routes>
        </main>
        
        <footer className="bg-white/10 backdrop-blur-md border-t border-white/20 py-8">
          <div className="container mx-auto px-4 text-center text-slate-400 text-sm font-medium">
            <p>&copy; 2026 EduManage System. Built with modern React principles.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
