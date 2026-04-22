import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, GraduationCap, Sparkles } from 'lucide-react';
import { studentService } from '../services/studentService';
import StudentForm from '../components/StudentForm';
import { useStudents } from '../hooks/useStudents';
import Loader from '../components/Loader';

/**
 * StudentFormPage Component
 * 
 * DESIGN PRINCIPLE: Form Handling
 * Centralizes Add/Edit logic. Redirects after success.
 */
const StudentFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addStudent, updateStudent } = useStudents();
  
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      const fetchStudent = async () => {
        try {
          setLoading(true);
          const data = await studentService.getStudentById(id);
          setInitialData(data);
        } catch (err) {
          setError("Student not found or failed to load data.");
        } finally {
          setLoading(false);
        }
      };
      fetchStudent();
    }
  }, [id, isEdit]);

  const handleSubmit = async (formData) => {
    try {
      setSaving(true);
      if (isEdit) {
        await updateStudent(id, formData);
      } else {
        await addStudent(formData);
      }
      // Redirect to dashboard after short success pause
      setTimeout(() => navigate('/dashboard'), 500);
    } catch (err) {
      alert("Error saving student. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="py-20"><Loader message="Loading student details..." /></div>;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-2xl">
        
        {/* Back Navigation */}
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-gray-500 hover:text-primary-600 transition-colors mb-8 group"
        >
          <ChevronLeft className="mr-1 group-hover:-translate-x-1 transition-transform" /> 
          Back to Dashboard
        </button>

        {/* Page Header */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-xl shadow-gray-200/50 relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <GraduationCap size={120} />
          </div>

          <div className="relative z-10 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary-600 font-bold tracking-tight uppercase text-sm">
                <Sparkles size={16} /> 
                {isEdit ? 'Modification Area' : 'Enrollment Center'}
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
                {isEdit ? 'Edit Student Profile' : 'Register New Student'}
              </h1>
              <p className="text-gray-500 max-w-md">
                Please provide the required details below to {isEdit ? 'update the existing' : 'create a new'} student record.
              </p>
            </div>

            {error ? (
              <div className="bg-red-50 border border-red-100 text-red-700 p-4 rounded-2xl flex items-center gap-3">
                <span className="font-medium">{error}</span>
              </div>
            ) : (
              <StudentForm 
                initialData={initialData} 
                onSubmit={handleSubmit} 
                isLoading={saving} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFormPage;
