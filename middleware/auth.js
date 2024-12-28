const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/dotenv");

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token exists in headers
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // Attach user data to the request object
    next(); // Proceed to the next middleware/handler
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

module.exports = { authenticateToken };
