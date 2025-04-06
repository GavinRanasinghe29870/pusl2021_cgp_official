const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const Clubuser = require("../../models/clubs/Clubuser");

dotenv.config();


const allowedRoles = ["SportPeople", "Admin", "Clubs"];

//Club Sign-Up Route
router.post("/Clubsignup", async (req, res) => {

    console.log("Received Signup Request:", req.body);
  try {
    const { ClubName, Clubusername, password, confirmPassword, mobile, address, email, sportLevel} = req.body;

    // Check for missing required fields
    if (!ClubName|| !Clubusername || !password || !confirmPassword || !email || !sportLevel) {
        return res.status(400).json({ error: "All required fields must be filled" });
    }

    // Validate sportLevel
    if (!allowedRoles.includes(sportLevel)) {
        return res.status(400).json({ error: `Invalid sportLevel selected: ${sportLevel}` });
    }
    

    // Check if passwords match
    if  (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match or are empty" });
    }
    

    // Check if the user already exists
    const existingUser = await Clubuser.findOne({ 
        $or: [{ Clubusername  }, { email }]
     });

        if(existingUser){
            return res.status(409).json({error: "User with this username or email already exists"})
        }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newClubuser = new Clubuser({
        ClubName,
        Clubusername,
        password: hashedPassword,
        mobile,
        address,
        email,
        sportLevel,  
       
    });

        await newClubuser.save();
      
        
        //Generate JWT token
        const token = jwt.sign({ id: newClubuser._id, Clubusername }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({
            _id: newClubuser._id,
            ClubName: newClubuser.ClubName,
            Clubusername: newClubuser.Clubusername,
            mobile: newClubuser.mobile,
            address: newClubuser.address,
            email: newClubuser.email,
            sportLevel: newClubuser.sportLevel,
            message: "Club User signed up successfully!"
        });
    } 
    
 catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
}
});

//Club Signin Route
router.post("/Clubsignin", async (req, res) => {
    console.log("Received Sign-In Request:", req.body);

      const { Clubusername, password, sportLevel } = req.body;

      if (!Clubusername || !password || !sportLevel) {
        return res.status(400).json({ message: "Club username,password and sport level are required" });
    }

    try{

    // Check if club exists
        const club = await Clubuser.findOne({ Clubusername, sportLevel });

        if (!club) {
            return res.status(401).json({ message: "Club not Found!" });
        }

    // Validate password
    const isMatch = await bcrypt.compare(password, club.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: club.id, Clubusername: club.Clubusername, sportLevel: club.sportLevel }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Club signed in successfully", token });

} catch (error) {
    console.error("Sign-in Error:", error);
    res.status(500).json({ error: "Internal Server Error"});
}
});




module.exports = router;

