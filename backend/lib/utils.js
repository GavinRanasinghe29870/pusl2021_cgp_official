const jwt = require('jsonwebtoken');

const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { 
        expiresIn: "1h", 
    });

    res.cookie("jwt", token, {
        maxAge: 3600000, // 1 hour in milliseconds
        httpOnly: true,
        sameSite: "strict",
        secure: false,
    });

    return token;
};

module.exports = { generateToken };