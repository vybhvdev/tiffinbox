const Menu = require('../models/Menu');

const getTodayDate = () => new Date().toISOString().split('T')[0];

exports.getTodayMenu = async (req, res) => {
  try {
    let menu = await Menu.findOne({ date: getTodayDate() });
    if (!menu) {
      // Return default menu if none set for today
      menu = {
        date: getTodayDate(),
        mainDish: 'Paneer Butter Masala',
        sideDish: 'Dal Tadka',
        bread: 'Butter Roti (4 pcs)',
        extras: 'Jeera Rice, Green Salad, Pickle',
        deliveryTime: '12:00 PM - 2:00 PM',
        isAvailable: true
      };
    }
    res.json({ success: true, menu });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.find().sort({ date: -1 }).limit(30);
    res.json({ success: true, menus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createOrUpdateMenu = async (req, res) => {
  try {
    const { date, mainDish, sideDish, bread, extras, deliveryTime, isAvailable } = req.body;
    const menuDate = date || getTodayDate();
    const menu = await Menu.findOneAndUpdate(
      { date: menuDate },
      { date: menuDate, mainDish, sideDish, bread, extras, deliveryTime, isAvailable },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json({ success: true, menu });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Menu deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
