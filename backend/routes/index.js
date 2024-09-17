const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');
const Crypto = require('../models/Crypto');

// Route to render index.html
router.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'views' });
});

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected...');
    // Start fetching data every 5 minutes
    setInterval(fetchCryptoData, 5 * 60 * 1000); // 5 minutes
    fetchCryptoData(); // Initial fetch
  })
  .catch(err => console.error('MongoDB connection error:', err));
// Route to fetch top 10 cryptocurrencies from MongoDB
router.get('/api/getTop10', async (req, res) => {
  try {
    const top10Cryptos = await Crypto.find().limit(10);
    res.json(top10Cryptos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});

module.exports = router;
