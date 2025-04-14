const jwt = require('jsonwebtoken');

const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    res.cookie("token", token, {
        maxAge: 86400000, // 1 Day in milliseconds
        httpOnly: true,
        sameSite: "lax",
        secure: false,
    });

    return token;
};

module.exports = { generateToken };