const express = require('express');
const router = express.Router();
const { adminProtect } = require('../middleware/auth');
const { getStats, getAllUsers } = require('../controllers/userController');
const { getAllOrders } = require('../controllers/orderController');
const { getPayments } = require('../controllers/paymentController');

router.get('/dashboard', adminProtect, async (req, res) => {
  try {
    const User = require('../models/User');
    const Order = require('../models/Order');
    const Payment = require('../models/Payment');

    const [totalUsers, activeSubscribers, totalOrders, payments, recentOrders, users] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ subscription: { $ne: null }, mealsLeft: { $gt: 0 } }),
      Order.countDocuments(),
      Payment.find({ status: 'paid' }),
      Order.find().populate('user', 'name phone').sort({ createdAt: -1 }).limit(10),
      User.find().sort({ createdAt: -1 }).limit(20)
    ]);

    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

    res.json({
      success: true,
      data: {
        stats: { totalUsers, activeSubscribers, totalOrders, totalRevenue },
        recentOrders,
        users
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
