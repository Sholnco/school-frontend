import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const DashboardPage = () => {
  const { user, logout } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', age: '' });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/students`)
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        console.error('Error fetching students:', err);
      });
  }, []);

  const handleAddStudent = (e) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_API_URL}/students`, newStudent)
      .then((res) => {
        setStudents([...students, res.data]);
        setNewStudent({ name: '', age: '' });
      })
      .catch((err) => {
        console.error('Error adding student:', err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>

        <div className="p-6 border-t border-gray-200">
          <h3 className="text-xl font-semibold">Welcome, {user?.name}!</h3>
          <p className="mt-2 text-gray-600">
            Your role is: <strong>{user?.role}</strong>
          </p>
          <p className="mt-1 text-gray-600">
            Your email is: <strong>{user?.email}</strong>
          </p>
        </div>

        <div className="p-6 border-t border-gray-200">
          <h3 className="text-lg font-bold mb-4">Add New Student</h3>
          <form onSubmit={handleAddStudent} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={newStudent.name}
              onChange={(e) =>
                setNewStudent({ ...newStudent, name: e.target.value })
              }
              className="w-full px-4 py-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Age"
              value={newStudent.age}
              onChange={(e) =>
                setNewStudent({ ...newStudent, age: e.target.value })
              }
              className="w-full px-4 py-2 border rounded"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Add Student
            </button>
          </form>
        </div>

        <div className="p-6 border-t border-gray-200">
          <h3 className="text-lg font-bold mb-2">All Students</h3>
          {students.length > 0 ? (
            <ul className="space-y-2">
              {students.map((student, index) => (
                <li key={index} className="p-3 bg-gray-50 rounded shadow-sm">
                  <strong>{student.name}</strong> — {student.age} years old
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No students found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
