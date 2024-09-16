const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const axios = require('axios');
const Crypto = require(path.join(__dirname, 'models', 'Crypto.js'));


const app = express();

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public'))); // Serves files from the 'public' folder

// Serve manifest.json and sw.js directly from the root directory
app.get('/manifest.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'manifest.json'));
});

app.get('/sw.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'sw.js'));
});

// Use routes from index.js
app.use('/', require('./routes/index')); // Ensure this path is correct

// Serve the telegram.html file
app.get('/connect/telegram', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'telegram.html'));
});

// Serve the index.html file
app.get('/views/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hodlinfo')
  .then(() => {
    console.log('MongoDB connected...');
    // Start fetching data every 5 minutes
    setInterval(fetchCryptoData, 5 * 60 * 1000); // 5 minutes
    fetchCryptoData(); // Initial fetch
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Fetch data from WazirX API
async function fetchCryptoData() {
  try {
    console.log('Fetching data from WazirX API...');
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    console.log('API Response:', response.data); // Log full response

    // Extract tickers
    const tickers = response.data;
    const count = Object.keys(tickers).length;
    console.log(`Total tickers found: ${count}`);
    if (!count) {
      console.error('No tickers found in API response');
      return;
    }

    // Convert tickers object to an array
    const tickerArray = Object.values(tickers);

    // Sort tickers by 'last' price in descending order
    tickerArray.sort((a, b) => parseFloat(b.last) - parseFloat(a.last));

    // Get top 10 tickers
    const top10 = tickerArray.slice(0, 10);

    // Clear existing data from the 'cryptos' collection
    await Crypto.deleteMany({});
    console.log('Existing data cleared.');

    // Format data
    const formattedData = top10.map(ticker => ({
      name: ticker.name,
      last: ticker.last,
      buy: ticker.buy,
      sell: ticker.sell,
      volume: ticker.volume,
      base_unit: ticker.base_unit
    }));

    // Insert new data into the 'cryptos' collection
    await Crypto.insertMany(formattedData);
    console.log('Data successfully updated in MongoDB.');
  } catch (error) {
    console.error('Error fetching or updating data:', error);
  }
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
