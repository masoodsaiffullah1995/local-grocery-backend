const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Place Order
router.post('/', async (req, res) => {
  const { user, products, totalAmount, address } = req.body;

  try {
    const order = new Order({ user, products, totalAmount, address });
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get user orders
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate('products.product');
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
