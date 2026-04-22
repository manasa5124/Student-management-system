import { useState, useEffect } from "react";
import { studentService } from "../services/studentService";

/**
 * Custom Hook: useStudents
 * 
 * REACT CONCEPT: useState
 * We use state to track the list of students, loading status, and errors.
 * 
 * REACT CONCEPT: useEffect
 * We use useEffect to trigger the initial data fetch when the component mounts.
 * 
 * WHY CUSTOM HOOKS?
 * This separates UI from logic. Any component that needs student data can just call this hook.
 */
export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await studentService.getAllStudents();
      setStudents(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch students");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = async (student) => {
    try {
      const newStudent = await studentService.createStudent(student);
      setStudents((prev) => [newStudent, ...prev]);
      return newStudent;
    } catch (err) {
      setError("Failed to add student");
      throw err;
    }
  };

  const updateStudent = async (id, updatedData) => {
    try {
      const updated = await studentService.updateStudent(id, updatedData);
      setStudents((prev) =>
        prev.map((s) => (s.id === id ? updated : s))
      );
      return updated;
    } catch (err) {
      setError("Failed to update student");
      throw err;
    }
  };

  const deleteStudent = async (id) => {
    try {
      await studentService.deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      setError("Failed to delete student");
      throw err;
    }
  };

  return {
    students,
    loading,
    error,
    addStudent,
    updateStudent,
    deleteStudent,
    refresh: fetchStudents,
  };
};
