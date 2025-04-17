const jwt = require('jsonwebtoken');

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,                  // 🛡️ Prevents client-side JS access
    maxAge: 24 * 60 * 60 * 1000,     // ⏱️ 1 day
    sameSite: "lax",                 // 📦 Protects against CSRF
    secure: process.env.NODE_ENV === "production", // 🔐 Secure only in production
    path: "/",                       // 🌐 Available throughout site
  });

  return token;
};

module.exports = { generateToken };
