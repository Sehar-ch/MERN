const express = require("express");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = process.env.PORT || 8000;

// ---- MIDDLEWARE ----
app.use(express.json()); // parses incoming JSON request bodies into req.body

// ---- ROUTES ----
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Student Management API is running.",
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
// Runs when no route above matched the request
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// ---- GLOBAL ERROR HANDLER ----
// Catches any unexpected errors thrown in route handlers
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});