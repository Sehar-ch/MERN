import React, { useState } from "react";

// Props:
// - onAddStudent: function passed down from App.js to add a new student
function StudentForm({ onAddStudent }) {
  // Local state for the form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [marks, setMarks] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // stop page reload

    if (!name || !email || !course || marks === "") {
      alert("Please fill in all fields.");
      return;
    }

    // Call the function passed from App.js (this is "lifting state up")
    onAddStudent({
      name: name.trim(),
      email: email.trim(),
      course: course.trim(),
      marks: Number(marks)
    });

    // Reset form after adding
    setName("");
    setEmail("");
    setCourse("");
    setMarks("");
  }

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <h2>Add a Student</h2>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Ayesha Khan"
          />
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. ayesha@email.com"
          />
        </div>

        <div className="field">
          <label htmlFor="course">Course</label>
          <input
            id="course"
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="e.g. MERN Stack"
          />
        </div>

        <div className="field">
          <label htmlFor="marks">Marks</label>
          <input
            id="marks"
            type="number"
            min="0"
            max="100"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            placeholder="e.g. 85"
          />
        </div>

        <button type="submit">Add Student</button>
      </div>
    </form>
  );
}

export default StudentForm;