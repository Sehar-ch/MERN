const mongoose = require("mongoose");

// Connects to MongoDB using the URI from environment variables.
// Called once when the server starts up (see server.js).
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // stop the app — it can't run without a database
  }
}

module.exports = connectDB;