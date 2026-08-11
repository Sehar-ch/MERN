import React from "react";
import { AuthProvider, useAuth } from "./context/authContext";
import Login from "./components/login";
import StudentManager from "./components/studentManager";
import "./App.css";

// This component decides what to show based on login state.
// It's a simple "protected route" pattern: if there's no valid token,
// the student dashboard never renders — only the Login screen does.
function AppContent() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <StudentManager /> : <Login />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;