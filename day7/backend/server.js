require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ---- CONNECT TO DATABASE ----
connectDB();

// ---- MIDDLEWARE ----
// Allows the React app (running on a different port, e.g. localhost:3000)
// to make requests to this API. Without this, the browser blocks the requests.
app.use(cors());
app.use(express.json());

// ---- ROUTES ----
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Student Management API with JWT Authentication is running.",
    endpoints: {
      "POST /auth/register": "Register a new user",
      "POST /auth/login": "Log in and receive a JWT token",
      "GET /auth/me": "Get logged-in user's profile (protected)",
      "GET /students": "Get all students (public)",
      "GET /students/:id": "Get a single student by ID (public)",
      "POST /students": "Create a new student (protected)",
      "PUT /students/:id": "Update a student (protected)",
      "DELETE /students/:id": "Delete a student (protected)"
    }
  });
});

app.use("/auth", authRoutes);
app.use("/students", studentRoutes);

// ---- 404 HANDLER ----
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// ---- GLOBAL ERROR HANDLER ----
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});