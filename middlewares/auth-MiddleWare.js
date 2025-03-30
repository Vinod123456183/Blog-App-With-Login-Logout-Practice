const jwt = require("jsonwebtoken");
const jwtSecret = "your_secret_key"; // Use environment variables in production

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token; // Ensure cookies exist

  if (!token) {
    return res.redirect("/admin/login"); // Redirect to login
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // Attach user data
    next(); // Move to next middleware/controller
  } catch (error) {
    console.error("Auth Error:", error);
    res.clearCookie("token"); // Clear invalid token
    res.redirect("/admin/login"); // Redirect if token is invalid
  }
};

module.exports = authMiddleware;
