import React, { useState, useEffect } from "react";

// Props:
// - editingStudent: student object if we're editing, or null if adding a new one
// - onSubmit: function(formData) called when the form is submitted
// - onCancelEdit: function called to exit edit mode without saving
// - loading: disables the form while a request is in flight
function StudentForm({ editingStudent, onSubmit, onCancelEdit, loading }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [marks, setMarks] = useState("");

  // Whenever editingStudent changes (user clicked "Edit" on a card),
  // pre-fill the form with that student's data.
  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setEmail(editingStudent.email);
      setCourse(editingStudent.course);
      setMarks(editingStudent.marks);
    } else {
      setName("");
      setEmail("");
      setCourse("");
      setMarks("");
    }
  }, [editingStudent]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ name: name.trim(), email: email.trim(), course: course.trim(), marks: Number(marks) });

    if (!editingStudent) {
      // Clear the form after adding (editing clears itself when editingStudent resets to null)
      setName("");
      setEmail("");
      setCourse("");
      setMarks("");
    }
  }

  const isEditing = Boolean(editingStudent);

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <h2>{isEditing ? `Edit Student #${editingStudent._id ? editingStudent._id.slice(-4) : ""}` : "Add a Student"}</h2>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required disabled={loading} />
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
        </div>

        <div className="field">
          <label htmlFor="course">Course</label>
          <input id="course" type="text" value={course} onChange={(e) => setCourse(e.target.value)} required disabled={loading} />
        </div>

        <div className="field">
          <label htmlFor="marks">Marks</label>
          <input id="marks" type="number" min="0" max="100" value={marks} onChange={(e) => setMarks(e.target.value)} required disabled={loading} />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : isEditing ? "Save Changes" : "Add Student"}
          </button>
          {isEditing && (
            <button type="button" className="secondary-btn" onClick={onCancelEdit} disabled={loading}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default StudentForm;