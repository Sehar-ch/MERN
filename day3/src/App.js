import React, { useState } from "react";
import StudentForm from "./Components/StudentForm";
import StudentList from "./Components/StudentList";
import Controls from "./Components/Controls";
import "./App.css";

// Starting data — lives in React state, no backend yet
const initialStudents = [
  { id: 1, name: "Ayesha Khan", email: "ayesha@email.com", course: "MERN Stack", marks: 88 },
  { id: 2, name: "Bilal Ahmed", email: "bilal@email.com", course: "MERN Stack", marks: 42 },
  { id: 3, name: "Sara Iqbal", email: "sara@email.com", course: "Frontend Dev", marks: 67 },
  { id: 4, name: "Hamza Tariq", email: "hamza@email.com", course: "Backend Dev", marks: 91 }
];

function App() {
  // ---- STATE ----
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");

  // Keeps track of the next id to assign (avoids duplicate ids after deletes)
  const [nextId, setNextId] = useState(initialStudents.length + 1);

  // ---- HANDLERS ----

  // Add a new student to state
  function handleAddStudent(newStudentData) {
    const newStudent = { id: nextId, ...newStudentData };
    setStudents([...students, newStudent]); // never mutate state directly
    setNextId(nextId + 1);
  }

  // Remove a student by id
  function handleDeleteStudent(id) {
    setStudents(students.filter((student) => student.id !== id));
  }

  // ---- DERIVED DATA ----

  // Unique list of courses, used to populate the filter dropdown
  const courseOptions = [...new Set(students.map((s) => s.course))];

  // Apply search (by name) + filter (by course) together
  const visibleStudents = students
    .filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((student) =>
      courseFilter === "all" ? true : student.course === courseFilter
    );

  return (
    <div className="app">
      <header className="topbar">
        <h1>Student Records</h1>
        <p className="subtitle">Day 3 — React Components, State &amp; Forms</p>
      </header>

      <main className="container">
        <StudentForm onAddStudent={handleAddStudent} />

        <Controls
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          courseFilter={courseFilter}
          onCourseFilterChange={setCourseFilter}
          courseOptions={courseOptions}
        />

        <StudentList students={visibleStudents} onDelete={handleDeleteStudent} />
      </main>

      <footer className="footer">
        <p>Built for Day 3 — HisabDo MERN Internship</p>
      </footer>
    </div>
  );
}

export default App;