const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', getCart);
router.post('/', addToCart);
router.put('/update', updateCartQuantity);
router.delete('/item', removeFromCart);
router.delete('/clear', clearCart);

module.exports = router;
