const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const userSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: true 
    },
    age: { 
        type: Number, 
        required: true 
    },
    username: { 
        type: String, 
        unique: true, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        unique: true, 
        required: true, 
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ // Email validation regex
    },
    mobile: { 
        type: String, 
        match: /^[0-9]{10}$/, // Validate mobile number (10 digits)
    },
    address: { 
        type: String 
    },
    sportLevel: { 
        type: String, 
        required: true, 
        enum: ["SportPeople", "Admin", "Clubs"] // Enforced values for sportLevel
    },
    gender: { 
        type: String 
    }
});

// Hash password before saving to the database
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare entered password with stored hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
