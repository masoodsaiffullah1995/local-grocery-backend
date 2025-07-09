const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Store = require('../models/Store');

// Register Store
router.post('/register', async (req, res) => {
  const { storeName, ownerName, email, password, phone, address, longitude, latitude } = req.body;

  try {
    let store = await Store.findOne({ email });
    if (store) return res.status(400).json({ msg: 'Store already exists' });

    store = new Store({
      storeName, ownerName, email, password, phone, address,
      location: { type: 'Point', coordinates: [longitude, latitude] }
    });

    const salt = await bcrypt.genSalt(10);
    store.password = await bcrypt.hash(password, salt);

    await store.save();

    const payload = { store: { id: store.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login Store
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const store = await Store.findOne({ email });
    if (!store) return res.status(400).json({ msg: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, store.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    const payload = { store: { id: store.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
