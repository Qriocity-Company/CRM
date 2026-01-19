// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../models/User');
require('dotenv').config();

exports.signup = async (req, res) => {

  try {
    if (req.user.username !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only admin can create users.' });
    }

    const { username, password } = req.body;
    console.log(username, password);
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
  console.log("Entering login function with body:", req.body);
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

    // Generate 6-digit OTP
    // crypto is built-in, but math.random is easier for simple 6-digit
    // const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // // Save OTP to user
    // user.otp = otp;
    // user.otpExpires = otpExpires;
    // await user.save();

    // console.log(`[OTP DEBUG] OTP for ${username} is ${otp}`); // Keep log for backup

    // // Send OTP via Email
    // try {
    //   const { sendOtpEmail } = require('../utils/emailService');
    //   await sendOtpEmail(username, otp);
    // } catch (emailError) {
    //   console.error('Failed to send OTP email:', emailError);
    //   // Optional: Fail login or allow proceed if email fails? For security, fail.
    //   // But for debugging/setup, we might want to just rely on console log.
    //   // We will assume it might fail if env vars aren't set, so we return OTP requirement anyway.
    // }

    // return res.status(200).json({ message: 'OTP sent to admin email', requiresOTP: true, username });

    // Direct Login without OTP
    const token = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Login successful', username: user.username, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.verifyOTP = async (req, res) => {
  const { username, otp } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (!user.otp || !user.otpExpires || user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Clear OTP
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Create a JWT token
    const token = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', username: user.username, token });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
};
