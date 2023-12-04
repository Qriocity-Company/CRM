// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../models/User');
require('dotenv').config();

exports.signup = async (req, res) => {
       
  try {
    
    const { username, password } = req.body;
    console.log(username , password);
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }
// Hash the password
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);

// Create a new user with the hashed password
const newUser = new User({ username, password: hashedPassword });
await newUser.save();
    
    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Error in signup:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try { 
    // Find the user based on the username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials , Username do not match' });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials , Password incorrect ' });
    }
    
    // Create a JWT token
    const token = jwt.sign({ username: user.username },  process.env.ACCESS_TOKEN_SECRET , { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful',username ,  token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
};
