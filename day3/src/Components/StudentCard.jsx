import React from "react";

// Props:
// - student: the student object { id, name, email, course, marks }
// - onDelete: function called with the student's id when Delete is clicked
function StudentCard({ student, onDelete }) {
  // Conditional rendering: pick a badge style/label based on marks
  let badgeClass = "marks-fail";
  let badgeLabel = `${student.marks} • Fail`;

  if (student.marks >= 80) {
    badgeClass = "marks-distinction";
    badgeLabel = `${student.marks} • Distinction`;
  } else if (student.marks >= 50) {
    badgeClass = "marks-pass";
    badgeLabel = `${student.marks} • Pass`;
  }

  return (
    <div className="student-card">
      <div className="student-id">#{student.id}</div>

      <div className="student-info">
        <strong>{student.name}</strong>
        <span>
          {student.email} • {student.course}
        </span>
      </div>

      <div className={`marks-badge ${badgeClass}`}>{badgeLabel}</div>

      <button className="delete-btn" onClick={() => onDelete(student.id)}>
        Delete
      </button>
    </div>
  );
}

export default StudentCard;