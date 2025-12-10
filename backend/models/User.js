const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },

  profilePic: String,

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  isVerified: { type: Boolean, default: false },
  verificationToken: String,

  resetPasswordToken: String,
  resetPasswordExpires: Date,

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
