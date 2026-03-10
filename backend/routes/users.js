// routes/users.js
const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, updateProfile, adminUpdateUser, getStats } = require('../controllers/userController');
const { protect, adminProtect } = require('../middleware/auth');

router.get('/stats', adminProtect, getStats);
router.get('/', adminProtect, getAllUsers);
router.get('/:id', adminProtect, getUserById);
router.put('/profile', protect, updateProfile);
router.put('/:id', adminProtect, adminUpdateUser);

module.exports = router;
