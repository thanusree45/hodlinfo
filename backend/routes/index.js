const express = require('express');
const router = express.Router();
const axios = require('axios');
const Crypto = require('../models/Crypto');

// Route to render index.html
router.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'views' });
});
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
