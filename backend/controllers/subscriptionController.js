const Subscription = require('../models/Subscription');
const User = require('../models/User');

const PLANS = {
  '20meals': { name: '20 Meals', meals: 20, price: 1999 },
  '40meals': { name: '40 Meals', meals: 40, price: 3499 },
  'monthly': { name: 'Monthly', meals: 60, price: 4999 }
};

exports.getUserSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      user: req.user._id,
      status: { $in: ['active', 'paused'] }
    }).sort({ createdAt: -1 });
    res.json({ success: true, subscription });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.pauseDate = async (req, res) => {
  try {
    const { date } = req.body;
    const user = await User.findById(req.user._id);
    const pausedDates = user.pausedDates || [];

    if (pausedDates.includes(date)) {
      const updated = pausedDates.filter(d => d !== date);
      await User.findByIdAndUpdate(req.user._id, { pausedDates: updated });
      res.json({ success: true, message: 'Delivery resumed', isPaused: false, pausedDates: updated });
    } else {
      pausedDates.push(date);
      await User.findByIdAndUpdate(req.user._id, { pausedDates });
      res.json({ success: true, message: 'Delivery paused', isPaused: true, pausedDates });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate('user', 'name phone')
      .sort({ createdAt: -1 });
    res.json({ success: true, subscriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin manually activates a plan for a user
exports.adminActivateSubscription = async (req, res) => {
  try {
    const { userId, plan } = req.body;
    const planData = PLANS[plan];
    if (!planData) {
      return res.status(400).json({ success: false, message: 'Invalid plan' });
    }

    await Subscription.updateMany(
      { user: userId, status: 'active' },
      { status: 'completed' }
    );

    const subscription = await Subscription.create({
      user: userId,
      plan,
      planName: planData.name,
      totalMeals: planData.meals,
      mealsLeft: planData.meals,
      price: planData.price,
      status: 'active'
    });

    await User.findByIdAndUpdate(userId, {
      mealsLeft: planData.meals,
      subscription: plan
    });

    res.json({ success: true, subscription });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.adminUpdateSubscription = async (req, res) => {
  try {
    const { mealsLeft, status } = req.body;
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      { mealsLeft, status },
      { new: true }
    ).populate('user', 'name phone');

    if (subscription) {
      await User.findByIdAndUpdate(subscription.user._id, {
        mealsLeft,
        subscription: status === 'active' ? subscription.plan : null
      });
    }
    res.json({ success: true, subscription });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
