const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Create new order
// @route   POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      discountPrice,
      totalPrice
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items provided' });
    }

    const orderId = 'VAV-' + Math.floor(100000 + Math.random() * 900000);

    const formattedOrderItems = orderItems.map((item) => ({
      product: item.product,
      name: item.name || item.title || 'VAVEVA Item',
      title: item.title || item.name || 'VAVEVA Item',
      image: item.image,
      price: item.price,
      color: item.color,
      size: item.size,
      quantity: item.quantity,
      subtotal: item.price * item.quantity
    }));

    const order = new Order({
      orderId,
      user: req.user._id,
      orderItems: formattedOrderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice: taxPrice || 0,
      shippingPrice: shippingPrice || 0,
      discountPrice: discountPrice || 0,
      totalPrice,
      isPaid: paymentMethod !== 'Cash On Delivery',
      paidAt: paymentMethod !== 'Cash On Delivery' ? Date.now() : null,
      orderStatus: 'Confirmed',
      courier: 'FedEx Air Express',
      trackingNumber: 'TRK-' + Math.floor(10000000 + Math.random() * 90000000),
      statusTimeline: [
        {
          status: 'Confirmed',
          timestamp: new Date(),
          note: 'Order confirmed and registered in warehouse queue.'
        }
      ]
    });

    const createdOrder = await order.save();

    // Decrement product inventory stock
    for (const item of orderItems) {
      if (item.product) {
        const prod = await Product.findById(item.product);
        if (prod && prod.inventory) {
          const invIndex = prod.inventory.findIndex(
            (inv) => inv.size === item.size && (inv.colorName === item.color || item.color === 'Default')
          );
          if (invIndex > -1 && prod.inventory[invIndex].stock > 0) {
            prod.inventory[invIndex].stock -= Math.min(prod.inventory[invIndex].stock, item.quantity);
            await prod.save();
          }
        }
      }
    }

    // Clear user's database cart upon order completion!
    const user = await User.findById(req.user._id);
    if (user) {
      user.cart = [];
      await user.save();
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error creating order' });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) {
      const orderByCustomId = await Order.findOne({ orderId: req.params.id });
      if (orderByCustomId) return res.json(orderByCustomId);
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders or /api/orders/my-orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel order (if pending or confirmed)
// @route   PUT /api/orders/:id/cancel
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to cancel this order' });
    }

    if (['Shipped', 'Out For Delivery', 'Delivered'].includes(order.orderStatus)) {
      return res.status(400).json({ message: `Cannot cancel an order that is already ${order.orderStatus}` });
    }

    order.orderStatus = 'Cancelled';
    order.statusTimeline.push({
      status: 'Cancelled',
      timestamp: new Date(),
      note: 'Order cancelled by customer.'
    });

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
