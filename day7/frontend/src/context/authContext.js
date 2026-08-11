import React, { createContext, useContext, useState } from "react";
import { loginUser } from "../api/api";

// AuthContext lets any component in the tree read/update login state
// without passing props down manually through every level ("prop drilling").
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // On first load, check if we already have a token/user saved from a previous session
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  async function login(email, password) {
    const response = await loginUser({ email, password });
    // Persist to localStorage so the user stays logged in after a page refresh
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.data));
    setToken(response.token);
    setUser(response.data);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }

  const value = {
    token,
    user,
    isAuthenticated: Boolean(token),
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook so components just do: const { user, logout } = useAuth();
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}