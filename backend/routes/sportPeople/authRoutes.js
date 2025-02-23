const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/sportPeople/signin') //Imports the User model

const router = express.Router()

//User Sign-Up Route
router.post("/signup",async (req,res) => {
  const {username,password, role } = req.body
  try {
    
    //Check if user already exists
    const existingUser = await User.findOne({ username })
    if (existingUser){
      return res.status(400).json({ message: "User already exists!"})
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      role
    })

    await newUser.save()

    //Generate JWT Token
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })

    res.status(201).json({ message: "User registered Sucessfully!",token })
  } catch (error) {
      console.error("Signup Error:",error.message)
      res.status(500).json({ message: "Server Error!" })
  }
})

//User Sign-In Route
router.post('/signin',async(req,res) => {
   
    const { username, password, role } = req.body 

    //Checks if the user exists
     try { 

        //find user
        const user = await User.findOne({ username, role })
        if (!user) return res.status(404).json({ message: 'User not found'})
        
        //Check Password
        const isValidPassword = await bcrypt.compare(password,user.password)
        if(!isValidPassword) return res.status(401).json({ message: 'Invalid Password'})
        
       // Generate a token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, message: 'Sign in successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
    
})

/* router.post('/google', async (req, res) => { 
    // Implement Google OAuth logic
   });

router.post('/facebook', async (req, res) => {
    // Implement Facebook OAuth logic
  });

router.post('/linkedin', async (req, res) => {
    // Implement LinkedIn OAuth logic
  }); */
module.exports = router 

