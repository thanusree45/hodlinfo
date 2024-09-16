const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
  name: String,
  last: Number,
  buy: Number,
  sell: Number,
  volume: Number,
  base_unit: String,
  additionalFields: mongoose.Schema.Types.Mixed // To handle extra fields if needed
}, { collection: 'cryptos' }); // Explicitly specify the collection name

module.exports = mongoose.model('Crypto', cryptoSchema);
