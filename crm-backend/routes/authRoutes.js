// routes/authRoutes.js
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

// Signup
router.post('/signup', authController.signup);

// Login
// router.post('/login', passport.authenticate('local'), authController.login);
router.post('/login',  authController.login);

// Logout
router.get('/logout', authController.logout);

module.exports = router;
