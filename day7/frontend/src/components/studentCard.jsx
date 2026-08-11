import React from "react";

// Props:
// - student: the student object from the API ({ _id, name, email, course, marks })
// - onEdit: called with the student when "Edit" is clicked
// - onDelete: called with the student's _id when "Delete" is clicked
function StudentCard({ student, onEdit, onDelete }) {
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
      <div className="student-info">
        <strong>{student.name}</strong>
        <span>{student.email} • {student.course}</span>
      </div>

      <div className={`marks-badge ${badgeClass}`}>{badgeLabel}</div>

      <div className="card-actions">
        <button className="edit-btn" onClick={() => onEdit(student)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(student._id)}>Delete</button>
      </div>
    </div>
  );
}

export default StudentCard;