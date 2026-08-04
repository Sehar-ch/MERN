const { students, getNextId, incrementNextId } = require("../database/Student");

// ---- VALIDATION HELPERS ----

// Basic email format check (good enough for Day 4, not production-grade)
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Checks the body of a create/update request and returns a list of errors
// (empty array = valid)
function validateStudentInput(body, { partial = false } = {}) {
  const errors = [];
  const { name, email, course, marks } = body;

  // For POST, all fields are required. For PUT, only validate fields that were sent.
  if (!partial || name !== undefined) {
    if (!name || typeof name !== "string" || !name.trim()) {
      errors.push("name is required and must be a non-empty string");
    }
  }

  if (!partial || email !== undefined) {
    if (!email || !isValidEmail(email)) {
      errors.push("email is required and must be a valid email address");
    }
  }

  if (!partial || course !== undefined) {
    if (!course || typeof course !== "string" || !course.trim()) {
      errors.push("course is required and must be a non-empty string");
    }
  }

  if (!partial || marks !== undefined) {
    const marksNum = Number(marks);
    if (marks === undefined || marks === null || marks === "" || isNaN(marksNum)) {
      errors.push("marks is required and must be a number");
    } else if (marksNum < 0 || marksNum > 100) {
      errors.push("marks must be between 0 and 100");
    }
  }

  return errors;
}

// ---- CONTROLLERS ----

// GET /students
function getAllStudents(req, res) {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
}

// GET /students/:id
function getStudentById(req, res) {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid student ID. ID must be a number." });
  }

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ success: false, message: `Student with ID ${id} not found.` });
  }

  res.status(200).json({ success: true, data: student });
}

// POST /students
function createStudent(req, res) {
  const errors = validateStudentInput(req.body);

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: "Validation failed", errors });
  }

  const newStudent = {
    id: getNextId(),
    name: req.body.name.trim(),
    email: req.body.email.trim(),
    course: req.body.course.trim(),
    marks: Number(req.body.marks)
  };

  students.push(newStudent);
  incrementNextId();

  res.status(201).json({ success: true, message: "Student created successfully", data: newStudent });
}

// PUT /students/:id
function updateStudent(req, res) {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid student ID. ID must be a number." });
  }

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ success: false, message: `Student with ID ${id} not found.` });
  }

  // Allow partial updates (only validate fields that were actually sent)
  const errors = validateStudentInput(req.body, { partial: true });

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: "Validation failed", errors });
  }

  if (req.body.name !== undefined) student.name = req.body.name.trim();
  if (req.body.email !== undefined) student.email = req.body.email.trim();
  if (req.body.course !== undefined) student.course = req.body.course.trim();
  if (req.body.marks !== undefined) student.marks = Number(req.body.marks);

  res.status(200).json({ success: true, message: "Student updated successfully", data: student });
}

// DELETE /students/:id
function deleteStudent(req, res) {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid student ID. ID must be a number." });
  }

  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: `Student with ID ${id} not found.` });
  }

  const deleted = students.splice(index, 1)[0];

  res.status(200).json({ success: true, message: "Student deleted successfully", data: deleted });
}

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};