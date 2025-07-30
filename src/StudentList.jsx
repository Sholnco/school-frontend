import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/students') // Direct connection to backend
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
      });
  }, []);

  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {students.map((student, index) => (
          <li key={index}>{student.name} - {student.age} years old</li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
