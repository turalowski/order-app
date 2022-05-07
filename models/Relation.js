const mongoose = require('mongoose');

const RelationSchema = new mongoose.Schema({
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
  category: {
    type: [Number],
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
  },
  iban: {
    type: String,
  },
  description: {
    type: String,
  },
  email: {
    type: String,
  },
  website: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('relation', RelationSchema);
