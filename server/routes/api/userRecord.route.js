const express = require('express');
const router = express.Router();
const UserRecordController = require('../../controller/user.controller');

// Register a new user
router.post('/register', UserRecordController.registeredUser);

// Log in a user
router.post('/login', UserRecordController.loginUser);

// Get user dashboard
// router.post('/dashboard', UserRecordController.userDashboard);

// Get user by ID
router.get('/:id', UserRecordController.getUserById);

module.exports = router;
