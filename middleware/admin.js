const jwt = require('jsonwebtoken');
const User = require('../models/User');

const adminAuth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Admins only.' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = adminAuth;
