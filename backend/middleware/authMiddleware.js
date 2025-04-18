const jwt = require("jsonwebtoken");
const User = require("../models/sportPeople/User");
const ClubUser = require("../models/clubs/Clubuser");

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

        // Check for User
        let user = await User.findById(decoded.userId).select("-password");

        // If not found in User, check in ClubUser
        if (!user) {
            user = await ClubUser.findById(decoded.userId).select("-password");
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { protectRoute };