const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, address },
      { new: true, runValidators: true }
    );
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.adminUpdateUser = async (req, res) => {
  try {
    const { mealsLeft, subscription, isActive } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { mealsLeft, subscription, isActive },
      { new: true }
    );
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeSubscribers = await User.countDocuments({ subscription: { $ne: null }, mealsLeft: { $gt: 0 } });
    const Order = require('../models/Order');
    const Payment = require('../models/Payment');
    const totalOrders = await Order.countDocuments();
    const payments = await Payment.find({ status: 'paid' });
    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
    res.json({ success: true, stats: { totalUsers, activeSubscribers, totalOrders, totalRevenue } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
