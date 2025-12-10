const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  me
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// Auth routes
router.post("/signup", signup);
router.post("/login", login);

// Password reset
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Example protected route
router.get("/me", authMiddleware, me);

module.exports = router;
