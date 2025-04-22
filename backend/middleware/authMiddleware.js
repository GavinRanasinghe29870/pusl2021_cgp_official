const jwt = require("jsonwebtoken");
const User = require("../models/sportPeople/User");
const Clubuser = require("../models/clubs/Clubuser");

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (user) {
            req.user = user;
            return next();
        }

        const club = await Clubuser.findById(decoded.userId).select("-password");
        if (club) {
            req.club = club;
            return next();
        }

        return res.status(404).json({ message: "User or Club not found" });

    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { protectRoute };