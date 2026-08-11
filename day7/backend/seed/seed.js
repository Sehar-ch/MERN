// Run this once to populate your MongoDB with sample students.
// Usage: node seed/seed.js

require("dotenv").config();
const mongoose = require("mongoose");
const Student = require("../models/student");
const sampleStudents = require("./students.sample.json");

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected. Seeding data...");

    // Clear existing students so re-running this script doesn't create duplicates
    await Student.deleteMany({});
    console.log("Existing students cleared.");

    const inserted = await Student.insertMany(sampleStudents);
    console.log(`${inserted.length} students inserted successfully.`);

    await mongoose.disconnect();
    console.log("Done. Disconnected from MongoDB.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
}

seedDatabase();