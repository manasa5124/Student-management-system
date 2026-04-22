import { useState, useEffect } from "react";
import { studentService } from "../services/studentService";
import { socketService } from "../services/socketService";

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
 * 
 * WEBSOCKET INTEGRATION:
 * This hook now connects to the WebSocket server and listens for real-time updates
 * when students are created, updated, or deleted by other users.
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
      const msg = err.message || "Failed to connect to server";
      setError(msg);
      console.error("Dashboard Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();

    // Connect to WebSocket server
    const socket = socketService.connect();

    // Listen for real-time updates
    socket.on('student:created', (newStudent) => {
      console.log('Student created via WebSocket:', newStudent);
      setStudents((prev) => [newStudent, ...prev]);
    });

    socket.on('student:updated', (updatedStudent) => {
      console.log('Student updated via WebSocket:', updatedStudent);
      setStudents((prev) =>
        prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
      );
    });

    socket.on('student:deleted', (data) => {
      console.log('Student deleted via WebSocket:', data);
      setStudents((prev) => prev.filter((s) => s.id !== data.id));
    });

    // Cleanup on unmount
    return () => {
      socket.off('student:created');
      socket.off('student:updated');
      socket.off('student:deleted');
    };
  }, []);

  const addStudent = async (student) => {
    try {
      const newStudent = await studentService.createStudent(student);
      // Note: WebSocket will handle the update, but we also update locally for immediate feedback
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
      // Note: WebSocket will handle the update, but we also update locally for immediate feedback
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
      // Note: WebSocket will handle the update, but we also update locally for immediate feedback
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
