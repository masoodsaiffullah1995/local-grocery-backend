const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/admin'); // 🔴 Import admin middleware
const Product = require('../models/Product');


// 🔴 1. Add Product (admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  const { name, price, description, category, store, imageUrl } = req.body;

  try {
    const product = new Product({ name, price, description, category, store, imageUrl });
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// 🔴 2. Get all products (public)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('store');
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// 🔴 3. Get products by category (public)
router.get('/category/:categoryName', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryName }).populate('store');
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// 🔴 4. Get products by store id (public)
router.get('/store/:storeId', async (req, res) => {
  try {
    const products = await Product.find({ store: req.params.storeId }).populate('store');
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// 🔴 5. Get single product by id (public)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('store');
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// 🔴 6. Update product (admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  const { name, price, description, category, imageUrl } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, category, imageUrl },
      { new: true }
    );
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// 🔴 7. Delete product (admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json({ msg: 'Product deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
