const User = require('../models/User');

// @desc    Get logged in user's cart
// @route   GET /api/cart
exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.cart || []);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching cart' });
  }
};

// @desc    Add item to cart or update quantity if exists
// @route   POST /api/cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, color, size, quantity = 1 } = req.body;
    if (!productId) return res.status(400).json({ message: 'Product ID is required' });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const existingIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId && item.color === color && item.size === size
    );

    if (existingIndex > -1) {
      user.cart[existingIndex].quantity += quantity;
    } else {
      user.cart.push({ product: productId, color, size, quantity });
    }

    await user.save();
    const updatedUser = await User.findById(req.user._id).populate('cart.product');
    res.json(updatedUser.cart);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error adding to cart' });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/update
exports.updateCartQuantity = async (req, res) => {
  try {
    const { productId, color, size, quantity } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const existingIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId && item.color === color && item.size === size
    );

    if (existingIndex > -1) {
      if (quantity <= 0) {
        user.cart.splice(existingIndex, 1);
      } else {
        user.cart[existingIndex].quantity = quantity;
      }
      await user.save();
    }

    const updatedUser = await User.findById(req.user._id).populate('cart.product');
    res.json(updatedUser.cart);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error updating cart' });
  }
};

// @desc    Remove single item from cart
// @route   DELETE /api/cart/item
exports.removeFromCart = async (req, res) => {
  try {
    const { productId, color, size } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.cart = user.cart.filter(
      (item) => !(item.product.toString() === productId && item.color === color && item.size === size)
    );

    await user.save();
    const updatedUser = await User.findById(req.user._id).populate('cart.product');
    res.json(updatedUser.cart);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error removing item from cart' });
  }
};

// @desc    Clear entire cart
// @route   DELETE /api/cart/clear
exports.clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.cart = [];
    await user.save();
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error clearing cart' });
  }
};
