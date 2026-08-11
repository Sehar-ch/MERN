const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require("../controllers/studentController");
const { protect } = require("../middleware/authMiddleware");

// Reading student data is public — anyone can view records.
router.get("/", getAllStudents);
router.get("/:id", getStudentById);

// Creating, updating, and deleting require a logged-in user (valid JWT).
router.post("/", protect, createStudent);
router.put("/:id", protect, updateStudent);
router.delete("/:id", protect, deleteStudent);

module.exports = router;