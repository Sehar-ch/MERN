import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { fetchStudents, createStudent, updateStudent, deleteStudent } from "../api/api";
import StudentForm from "./studentForm";
import SearchBar from "./searchBar";
import StudentList from "./studentList";

function StudentManager() {
  const { user, logout } = useAuth();

  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);

  // Two separate loading flags: one for the initial page load,
  // one for form submissions (add/edit/delete), so the UI can react to each differently.
  const [pageLoading, setPageLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch students once when the dashboard first mounts
  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    setPageLoading(true);
    setError("");
    try {
      const response = await fetchStudents();
      setStudents(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setPageLoading(false);
    }
  }

  async function handleFormSubmit(formData) {
    setFormLoading(true);
    setError("");
    try {
      if (editingStudent) {
        const response = await updateStudent(editingStudent._id, formData);
        // Replace the updated student in place instead of re-fetching everything
        setStudents((prev) => prev.map((s) => (s._id === editingStudent._id ? response.data : s)));
        setEditingStudent(null);
      } else {
        const response = await createStudent(formData);
        setStudents((prev) => [response.data, ...prev]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setFormLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this student? This cannot be undone.")) return;

    setError("");
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  const visibleStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-content">
          <div>
            <h1>Student Records</h1>
            <p className="subtitle">Day 7 — Full-Stack MERN Dashboard</p>
          </div>
          <div className="user-box">
            <span>{user?.name}</span>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </div>
        </div>
      </header>

      <main className="container">
        <StudentForm
          editingStudent={editingStudent}
          onSubmit={handleFormSubmit}
          onCancelEdit={() => setEditingStudent(null)}
          loading={formLoading}
        />

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {/* Error state — shown regardless of what triggered it (fetch, add, edit, delete) */}
        {error && <p className="error-banner">{error}</p>}

        {/* Loading state — only for the initial fetch */}
        {pageLoading ? (
          <div className="panel loading-state">
            <p>Loading students...</p>
          </div>
        ) : (
          <StudentList students={visibleStudents} onEdit={setEditingStudent} onDelete={handleDelete} />
        )}
      </main>

      <footer className="footer">
        <p>Built for Day 7 — HisabDo MERN Internship</p>
      </footer>
    </div>
  );
}

export default StudentManager;