const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  const token =
    req.header("Authorization") && req.header("Authorization").split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    if (!req.user) {
      return res.status(404).json({ message: "User not found." });
    }
    console.log("User authenticated:", req.user); // Add this line
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

const authorize = (roles) => {
  return (req, res, next) => {
    console.log("User role:", req.user.role); // Add this line
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied, insufficient permissions." });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
