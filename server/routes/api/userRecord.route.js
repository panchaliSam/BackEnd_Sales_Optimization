const express = require('express');
const router = express.Router();
const UserRecordController = require('../../controller');

router.post('/register', UserRecordController.registeredUser);
router.post('/login', UserRecordController.loginUser);
router.post('/dashboard', UserRecordController.userDashboard);
router.post('/:id', UserRecordController.getUserById);


module.exports = router;