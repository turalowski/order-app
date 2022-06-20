const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  description: {
      type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('stock', StockSchema);
