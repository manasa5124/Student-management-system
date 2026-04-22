import React from 'react';
import { Edit2, Trash2, Calendar, Book, User } from 'lucide-react';
import Button from './Button';

/**
 * StudentTable Component
 * 
 * DESIGN PRINCIPLE: Responsive Design
 * This component uses a mix of Table (for desktop) and Card Grid (for mobile)
 * to ensure data is readable on all devices.
 */
const StudentTable = ({ students, onEdit, onDelete }) => {
  if (students.length === 0) return null;

  return (
    <div className="w-full">
      {/* Mobile: Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {students.map((student) => (
          <div key={student.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{student.name}</h3>
                <p className="text-primary-600 font-medium text-sm">{student.course}</p>
              </div>
              <div className="bg-primary-50 px-2 py-1 rounded text-xs font-bold text-primary-700">
                Age: {student.age}
              </div>
            </div>
            
            <div className="flex items-center text-gray-500 text-xs mb-4">
              <Calendar size={14} className="mr-1" />
              Added {new Date(student.createdAt).toLocaleDateString()}
            </div>

            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                size="sm" 
                className="flex-1"
                onClick={() => onEdit(student)}
              >
                <Edit2 size={14} className="mr-2" /> Edit
              </Button>
              <Button 
                variant="danger" 
                size="sm" 
                className="flex-1"
                onClick={() => onDelete(student.id)}
              >
                <Trash2 size={14} className="mr-2" /> Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Table View */}
      <div className="hidden md:block overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                      {student.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-gray-900">{student.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 font-medium">{student.age}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    {student.course}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">
                  {new Date(student.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onEdit(student)}
                      className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      title="Edit Student"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => onDelete(student.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Student"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
