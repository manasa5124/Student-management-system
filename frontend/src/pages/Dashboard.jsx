import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Users, GraduationCap, Clock, AlertCircle } from 'lucide-react';
import { useStudents } from '../hooks/useStudents';
import StudentTable from '../components/StudentTable';
import Button from '../components/Button';
import Loader, { EmptyState } from '../components/Loader';

/**
 * Dashboard Page Component
 * 
 * DESIGN PRINCIPLE: Component Architecture
 * We separate the data logic (useStudents hook) from the representation (StudentTable).
 */
const Dashboard = () => {
  const { students, loading, error, deleteStudent } = useStudents();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Filter students based on search term
  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student record?")) {
      try {
        await deleteStudent(id);
      } catch (err) {
        alert("Action failed: " + err.message);
      }
    }
  };

  const handleEdit = (student) => {
    navigate(`/edit/${student.id}`);
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Something went wrong</h2>
        <p className="text-gray-500 mt-2">{error}</p>
        <Button className="mt-6" onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Student Directory</h1>
            <p className="text-gray-500 mt-1">Manage and monitor all student records in one place.</p>
          </div>
          <Button onClick={() => navigate('/add')} className="rounded-full shadow-lg shadow-primary-500/20">
            <Plus size={20} className="mr-2" /> Add New Student
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard 
            title="Total Students" 
            value={students.length} 
            icon={<Users className="text-blue-600" />}
            color="bg-blue-50"
          />
          <StatCard 
            title="Active Courses" 
            value={[...new Set(students.map(s => s.course))].length} 
            icon={<GraduationCap className="text-purple-600" />}
            color="bg-purple-50"
          />
          <StatCard 
            title="Recent Updates" 
            value={Math.min(students.length, 3)} 
            icon={<Clock className="text-amber-600" />}
            color="bg-amber-50"
          />
        </div>

        {/* Search & Actions Bar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or course..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Data Display */}
        <div className="relative">
          {loading ? (
            <Loader message="Fetching student records..." />
          ) : filteredStudents.length > 0 ? (
            <StudentTable 
              students={filteredStudents} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          ) : (
            <EmptyState message={searchTerm ? `No results found for "${searchTerm}"` : "Your directory is currently empty."} />
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-6 hover:shadow-md transition-shadow">
    <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center`}>
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
      <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{value}</h3>
    </div>
  </div>
);

export default Dashboard;
