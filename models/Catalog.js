const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Catalog = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('catalog', Catalog);
