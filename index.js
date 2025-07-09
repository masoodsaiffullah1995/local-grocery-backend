const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize app
const app = express();
app.use(express.json());
app.use(cors());

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//userRoutes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);


//storeRoutes

const storeRoutes = require('./routes/storeRoutes');
app.use('/api/stores', storeRoutes);


//productRoutes

const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);


//orderRoutes

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);



