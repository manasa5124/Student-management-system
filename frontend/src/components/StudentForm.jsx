import React, { useState, useEffect } from 'react';
import Button from './Button';
import { User, BookOpen, Hash, CheckCircle } from 'lucide-react';

/**
 * StudentForm Component
 * 
 * REACT CONCEPT: Closures
 * The 'handleChange' function is a closure that remembers which field it's updating.
 * 
 * DESIGN PRINCIPLE: Semantic HTML & Accessibility
 * Use labels with 'htmlFor' pointing to input 'id'. Use proper input types.
 */
const StudentForm = ({ initialData, onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    course: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Handle form field changes using a closure-like pattern
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age) newErrors.age = 'Age is required';
    else if (formData.age < 0) newErrors.age = 'Age cannot be negative';
    if (!formData.course.trim()) newErrors.course = 'Course is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <User size={16} className="text-primary-600" /> Full Name
        </label>
        <div className="relative">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="e.g. John Doe"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-primary-500'} focus:ring-4 focus:ring-primary-500/10 outline-none transition-all`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="age" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Hash size={16} className="text-primary-600" /> Age
          </label>
          <input
            id="age"
            name="age"
            type="number"
            placeholder="e.g. 20"
            value={formData.age}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border ${errors.age ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-primary-500'} focus:ring-4 focus:ring-primary-500/10 outline-none transition-all`}
          />
          {errors.age && <p className="text-red-500 text-xs mt-1 ml-1">{errors.age}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="course" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <BookOpen size={16} className="text-primary-600" /> Course
          </label>
          <input
            id="course"
            name="course"
            type="text"
            placeholder="e.g. Computer Science"
            value={formData.course}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border ${errors.course ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-primary-500'} focus:ring-4 focus:ring-primary-500/10 outline-none transition-all`}
          />
          {errors.course && <p className="text-red-500 text-xs mt-1 ml-1">{errors.course}</p>}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        size="lg"
        isLoading={isLoading}
      >
        <span className="flex items-center gap-2">
          <CheckCircle size={20} />
          {initialData ? 'Update Student' : 'Save Student'}
        </span>
      </Button>
    </form>
  );
};

export default StudentForm;
