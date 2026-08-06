require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const studentRoutes = require("./Routes/StudentRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ---- CONNECT TO DATABASE ----
connectDB();

// ---- MIDDLEWARE ----
app.use(express.json());

// ---- ROUTES ----
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Student Management API (MongoDB) is running.",
    endpoints: {
      "GET /students": "Get all students",
      "GET /students/:id": "Get a single student by ID",
      "POST /students": "Create a new student",
      "PUT /students/:id": "Update an existing student",
      "DELETE /students/:id": "Delete a student"
    }
  });
});

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