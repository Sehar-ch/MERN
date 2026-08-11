// Central place for every call to the backend.
// Automatically attaches the JWT token (if we have one) and
// throws a normal JS Error with the backend's message on failure,
// so components can just try/catch.

const BASE_URL = "http://localhost:5000";

async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json();

  if (!response.ok) {
    // Prefer the backend's message, fall back to validation errors, then a generic message
    const message = data.message || (data.errors && data.errors.join(", ")) || "Request failed";
    throw new Error(message);
  }

  return data;
}

// ---- AUTH ----
export function registerUser(payload) {
  return apiRequest("/auth/register", { method: "POST", body: JSON.stringify(payload) });
}

export function loginUser(payload) {
  return apiRequest("/auth/login", { method: "POST", body: JSON.stringify(payload) });
}

// ---- STUDENTS ----
export function fetchStudents() {
  return apiRequest("/students");
}

export function createStudent(payload) {
  return apiRequest("/students", { method: "POST", body: JSON.stringify(payload) });
}

export function updateStudent(id, payload) {
  return apiRequest(`/students/${id}`, { method: "PUT", body: JSON.stringify(payload) });
}

export function deleteStudent(id) {
  return apiRequest(`/students/${id}`, { method: "DELETE" });
}