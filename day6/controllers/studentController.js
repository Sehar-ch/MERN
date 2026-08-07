const Student = require("../models/student");

// GET /students
async function getAllStudents(req, res) {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: students.length, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch students", error: error.message });
  }
}

// GET /students/:id
async function getStudentById(req, res) {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ success: false, message: `Student with ID ${req.params.id} not found.` });
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    // CastError happens when the id in the URL isn't a valid MongoDB ObjectId format
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid student ID format." });
    }
    res.status(500).json({ success: false, message: "Failed to fetch student", error: error.message });
  }
}

// POST /students
async function createStudent(req, res) {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ success: true, message: "Student created successfully", data: student });
  } catch (error) {
    // Mongoose schema validation failed (missing/invalid fields)
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: "Validation failed", errors: messages });
    }
    // Duplicate email (unique index violation)
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: "A student with this email already exists." });
    }
    res.status(500).json({ success: false, message: "Failed to create student", error: error.message });
  }
}

// PUT /students/:id
async function updateStudent(req, res) {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // return the updated doc, and re-run schema validation
    );

    if (!student) {
      return res.status(404).json({ success: false, message: `Student with ID ${req.params.id} not found.` });
    }

    res.status(200).json({ success: true, message: "Student updated successfully", data: student });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid student ID format." });
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: "Validation failed", errors: messages });
    }
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: "A student with this email already exists." });
    }
    res.status(500).json({ success: false, message: "Failed to update student", error: error.message });
  }
}

// DELETE /students/:id
async function deleteStudent(req, res) {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ success: false, message: `Student with ID ${req.params.id} not found.` });
    }

    res.status(200).json({ success: true, message: "Student deleted successfully", data: student });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid student ID format." });
    }
    res.status(500).json({ success: false, message: "Failed to delete student", error: error.message });
  }
}

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};