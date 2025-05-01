const express = require('express');
const { login } = require('../controllers/authController');

const router = express.Router();

// @route   POST api/auth/login
// @desc    Authenticate user & get token (or user data)
// @access  Public
router.post('/login', login);

// Add other auth-related routes if needed

module.exports = router;