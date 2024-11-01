const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  img: {
    data: Buffer,
    contentType: String
  }
});

module.exports = mongoose.model('User', UserSchema);
