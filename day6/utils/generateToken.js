const jwt = require("jsonwebtoken");

// Creates a signed JWT containing the user's id.
// The token expires after JWT_EXPIRES_IN (default 1 day).
function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d"
  });
}

module.exports = generateToken;