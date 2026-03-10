const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true // One menu per day
  },
  mainDish: {
    type: String,
    required: true,
    default: 'Paneer Butter Masala'
  },
  sideDish: {
    type: String,
    required: true,
    default: 'Dal Tadka'
  },
  bread: {
    type: String,
    required: true,
    default: 'Butter Roti (4 pcs)'
  },
  extras: {
    type: String,
    default: 'Jeera Rice, Green Salad, Pickle'
  },
  deliveryTime: {
    type: String,
    default: '12:00 PM - 2:00 PM'
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Menu', menuSchema);
