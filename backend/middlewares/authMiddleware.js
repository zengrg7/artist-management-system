const jwt = require("jsonwebtoken");
const { detokenize } = require("../lib/utils");

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = detokenize(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};

const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Forbidden: You don't have access." });
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRole };
