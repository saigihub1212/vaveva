const express = require('express');
const router = express.Router();
const { validateCoupon, getCoupons, createCoupon } = require('../controllers/couponController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getCoupons);
router.post('/validate', validateCoupon);
router.post('/', protect, adminOnly, createCoupon);

module.exports = router;
