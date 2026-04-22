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

  // Ensure students is an array before filtering
  const studentList = Array.isArray(students) ? students : [];

  // Filter students based on search term
  const filteredStudents = studentList.filter(s => 
    s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.course?.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        
        {/* Dashboard Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">Student Directory</h1>
            <p className="text-lg text-slate-500 font-medium">Monitoring <span className="text-primary-600 font-bold">{studentList.length}</span> active profiles across all departments.</p>
          </div>
          <Button onClick={() => navigate('/add')} size="lg" className="rounded-2xl h-14 shadow-xl">
            <Plus size={24} className="mr-2" /> Add New Student
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <StatCard 
            title="Total Students" 
            value={studentList.length} 
            icon={<Users />}
            color="bg-primary-500/10 text-primary-600"
            trend="+12% from last month"
          />
          <StatCard 
            title="Active Courses" 
            value={[...new Set(studentList.map(s => s.course))].length} 
            icon={<GraduationCap />}
            color="bg-brand-500/10 text-brand-600"
            trend="High demand in IT"
          />
          <StatCard 
            title="System Status" 
            value="Stable" 
            icon={<Clock />}
            color="bg-emerald-500/10 text-emerald-600"
            trend="All services active"
          />
        </div>

        {/* Search & Content */}
        <div className="glass-card rounded-[2.5rem] overflow-hidden">
          <div className="p-8 border-b border-white/20 bg-white/30">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search students by name or course..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 glass-input rounded-2xl outline-none placeholder:text-slate-400 font-medium"
              />
            </div>
          </div>

          <div className="p-2">
            {loading ? (
              <Loader message="Synchronizing data..." />
            ) : filteredStudents.length > 0 ? (
              <StudentTable 
                students={filteredStudents} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
              />
            ) : (
              <EmptyState message={searchTerm ? `No matching records for "${searchTerm}"` : "The database is currently empty."} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color, trend }) => (
  <div className="glass-card p-8 rounded-[2rem] flex items-center justify-between group hover:scale-[1.02] transition-all duration-500">
    <div className="space-y-3">
      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{title}</p>
      <div className="flex items-baseline space-x-2">
        <h3 className="text-4xl font-black text-slate-900">{value}</h3>
      </div>
      <p className="text-xs font-semibold text-slate-400">{trend}</p>
    </div>
    <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform duration-500`}>
      {React.cloneElement(icon, { size: 32, strokeWidth: 2.5 })}
    </div>
  </div>
);

export default Dashboard;
