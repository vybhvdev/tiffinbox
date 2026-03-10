const express = require('express');
const router = express.Router();
const { getUserOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, adminProtect } = require('../middleware/auth');

router.get('/my', protect, getUserOrders);
router.get('/', adminProtect, getAllOrders);
router.put('/:id', adminProtect, updateOrderStatus);

module.exports = router;
