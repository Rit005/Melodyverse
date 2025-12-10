const rateLimit = require("express-rate-limit");

const authRateLimiter = rateLimit({
  windowMs: 60 * 1000,    // 1 minute
  max: 5,                 // 5 attempts/min
  message: {
    message: "Too many attempts, please try again later",
  }
});

module.exports = authRateLimiter;
