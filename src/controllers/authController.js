const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

// User registration
exports.registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = new UserModel({
            username,
            password: hashedPassword,
        });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
};

// User login
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username' });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, "Hakuna Matata", {
            expiresIn: '1h', // Set token expiration time
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
};


// Token verification
exports.checkTokenValidity = (req, res) => {
    res.json({ valid: true });
};
