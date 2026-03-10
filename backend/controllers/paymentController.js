const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const User = require('../models/User');
const Subscription = require('../models/Subscription');

const PLANS = {
  '20meals': { name: '20 Meals', meals: 20, price: 1999 },
  '40meals': { name: '40 Meals', meals: 40, price: 3499 },
  'monthly': { name: 'Monthly', meals: 60, price: 4999 }
};

const getRazorpay = () => new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createOrder = async (req, res) => {
  try {
    const { plan } = req.body;
    const planData = PLANS[plan];
    if (!planData) {
      return res.status(400).json({ success: false, message: 'Invalid plan selected' });
    }

    const razorpay = getRazorpay();
    const options = {
      amount: planData.price * 100, // in paise
      currency: 'INR',
      receipt: `tiffinbox_${Date.now()}`,
      notes: { plan, userId: req.user._id.toString() }
    };

    const order = await razorpay.orders.create(options);

    await Payment.create({
      user: req.user._id,
      razorpayOrderId: order.id,
      plan,
      amount: planData.price,
      status: 'created'
    });

    res.json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
      plan: planData
    });
  } catch (error) {
    console.error('Payment create error:', error);
    res.status(500).json({ success: false, message: 'Failed to create payment order' });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Payment verification failed' });
    }

    // Update payment record
    await Payment.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: 'paid'
      }
    );

    // Activate subscription
    const planData = PLANS[plan];
    await Subscription.updateMany(
      { user: req.user._id, status: 'active' },
      { status: 'completed' }
    );

    await Subscription.create({
      user: req.user._id,
      plan,
      planName: planData.name,
      totalMeals: planData.meals,
      mealsLeft: planData.meals,
      price: planData.price,
      paymentId: razorpay_payment_id,
      status: 'active'
    });

    await User.findByIdAndUpdate(req.user._id, {
      mealsLeft: planData.meals,
      subscription: plan
    });

    res.json({ success: true, message: 'Payment verified and subscription activated!' });
  } catch (error) {
    console.error('Verify error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('user', 'name phone')
      .sort({ createdAt: -1 });
    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
