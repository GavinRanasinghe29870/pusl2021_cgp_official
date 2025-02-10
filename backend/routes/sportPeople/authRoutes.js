const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/sportPeople/signin') //Imports the User model

const router = express.Router()

//User Sign-In Route
router.post('/signin',async(req,res) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ username })
        if (!user) return res.status(400).json({ message: 'User not found'})

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json({ message: 'Invalid Password'})
        
        const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        
        res.json({ token, user: { id: user._id, username: user.username}})

    }
    catch (error) {
        res.status(500).json({ message: "Server Error" })

    }
    
})

module.exports = router