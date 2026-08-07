const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Protects a route — only allows the request through if a valid JWT
// is provided in the Authorization header as: "Bearer <token>"
async function protect(req, res, next) {
  let token;

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the logged-in user (minus password) to req, so later
    // route handlers know WHO is making the request.
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ success: false, message: "Not authorized. User no longer exists." });
    }

    next(); // token is valid — let the request continue to the actual route handler
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Session expired. Please log in again." });
    }
    return res.status(401).json({ success: false, message: "Not authorized. Invalid token." });
  }
}

module.exports = { protect };