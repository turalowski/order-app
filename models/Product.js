const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String,
    required: true,
  },
  catalog: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'catalog'
  },
  manufacturer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'relation'
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  barcode: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('product', Product);
