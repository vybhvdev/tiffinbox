const express = require('express');
const router = express.Router();
const {
  getUserSubscription,
  pauseDate,
  getAllSubscriptions,
  adminActivateSubscription,
  adminUpdateSubscription
} = require('../controllers/subscriptionController');
const { protect, adminProtect } = require('../middleware/auth');

router.get('/my', protect, getUserSubscription);
router.post('/pause', protect, pauseDate);
router.get('/', adminProtect, getAllSubscriptions);
router.post('/admin-activate', adminProtect, adminActivateSubscription);
router.put('/:id', adminProtect, adminUpdateSubscription);

module.exports = router;
