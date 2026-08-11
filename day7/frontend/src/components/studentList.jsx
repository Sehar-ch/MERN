import React from "react";
import StudentCard from "./studentCard";

function StudentList({ students, onEdit, onDelete }) {
  return (
    <div className="panel">
      <div className="list-header">
        <h2>Student List</h2>
        <span className="count-badge">
          {students.length} student{students.length === 1 ? "" : "s"}
        </span>
      </div>

      {students.length === 0 ? (
        <p className="empty-message">No students found.</p>
      ) : (
        <div className="student-list">
          {students.map((student) => (
            <StudentCard key={student._id} student={student} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentList;