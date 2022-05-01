const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  user: {
      type: 
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
    type: Array,
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

module.exports = mongoose.model('user', UserSchema);
