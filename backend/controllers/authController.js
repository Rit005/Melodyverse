const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { username, email, password, fullName, profilePic } = req.body;

    // validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // check duplicate
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hash = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      username,
      email,
      password: hash,
      fullName,
      profilePic
    });

    // generate token
    const token = jwt.sign(
      { id: user._id, email },
      "secret", // use env variable in real apps
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "Signup successful",
      token
    });

  } catch (error) {
    console.log("Signup Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // check user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid User" });

    // compare password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "secret",
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login Success",
      token
    });

  } catch (error) {
    console.log("Login Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
