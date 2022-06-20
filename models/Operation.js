const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Operation = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  invoice: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  counterparty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'relation',
  },
  products: {
    type: [
      {
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'product',
        },
        price: {
          type: Number,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('operation', Operation);
