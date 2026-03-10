const express = require('express');
const router = express.Router();
const { getTodayMenu, getAllMenus, createOrUpdateMenu, deleteMenu } = require('../controllers/menuController');
const { protect, adminProtect } = require('../middleware/auth');

router.get('/today', protect, getTodayMenu);
router.get('/', adminProtect, getAllMenus);
router.post('/', adminProtect, createOrUpdateMenu);
router.delete('/:id', adminProtect, deleteMenu);

module.exports = router;
