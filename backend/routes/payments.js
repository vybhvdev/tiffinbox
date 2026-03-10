const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, getPayments, getUserPayments } = require('../controllers/paymentController');
const { protect, adminProtect } = require('../middleware/auth');

router.post('/create-order', protect, createOrder);
router.post('/verify', protect, verifyPayment);
router.get('/my', protect, getUserPayments);
router.get('/', adminProtect, getPayments);

module.exports = router;
