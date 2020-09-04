const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userModel = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
});

module.exports = mongoose.model('User', userModel);
