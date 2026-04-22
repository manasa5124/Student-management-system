import React, { useState, useEffect } from 'react';
import Button from './Button';
import { User, BookOpen, Hash, CheckCircle, Upload, X, Image as ImageIcon } from 'lucide-react';

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
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (initialData.image) {
        setImagePreview(initialData.image);
      }
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only JPEG, PNG, and WebP images are allowed');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
      const response = await fetch(`${API_URL}/api/upload/image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      setFormData((prev) => ({ ...prev, image: data.imageUrl }));
      setImagePreview(data.imageUrl);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
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
      {/* Image Upload Section */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <ImageIcon size={16} className="text-primary-600" /> Profile Image
        </label>
        
        {imagePreview ? (
          <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-primary-200 bg-gray-50">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="relative w-full h-48 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:border-primary-400 hover:bg-primary-50 transition-all flex flex-col items-center justify-center">
            <input
              type="file"
              id="image"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageUpload}
              disabled={uploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Upload size={32} className="text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 font-medium">
              {uploading ? 'Uploading...' : 'Click to upload image'}
            </p>
            <p className="text-xs text-gray-400 mt-1">JPEG, PNG, WebP (max 5MB)</p>
          </div>
        )}
      </div>

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
        isLoading={isLoading || uploading}
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
