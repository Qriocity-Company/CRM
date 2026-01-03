// routes/authRoutes.js
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

const authenticateToken = require('../middleware/Authentication');

// Signup
router.post('/signup', authenticateToken, authController.signup);

// Login
// router.post('/login', passport.authenticate('local'), authController.login);
router.post('/login', authController.login);

// Logout
router.get('/logout', authController.logout);

module.exports = router;
