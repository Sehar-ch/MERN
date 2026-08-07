const mongoose = require("mongoose");

// Schema = the shape and validation rules for a student document.
// Mongoose enforces these rules automatically on .save() / .create() / findByIdAndUpdate (with runValidators).
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true, // no two students can share an email
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"]
    },
    course: {
      type: String,
      required: [true, "Course is required"],
      trim: true
    },
    marks: {
      type: Number,
      required: [true, "Marks is required"],
      min: [0, "Marks cannot be less than 0"],
      max: [100, "Marks cannot be more than 100"]
    }
  },
  {
    timestamps: true // adds createdAt / updatedAt automatically
  }
);

module.exports = mongoose.model("Student", studentSchema);