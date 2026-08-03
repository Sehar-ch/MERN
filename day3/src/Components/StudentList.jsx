import React from "react";
import StudentCard from "./StudentCard";

// Props:
// - students: array of student objects to display
// - onDelete: passed down to each StudentCard
function StudentList({ students, onDelete }) {
  return (
    <div className="panel">
      <div className="list-header">
        <h2>Student List</h2>
        <span className="count-badge">
          {students.length} student{students.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* Conditional rendering: show message if list is empty */}
      {students.length === 0 ? (
        <p className="empty-message">No students found.</p>
      ) : (
        <div className="student-list">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentList;