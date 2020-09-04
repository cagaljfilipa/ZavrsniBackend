const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  postNumber: { type: String, required: true },
  state: { type: String, required: true },
  moneyTotal: { type: Number, required: true },
});

module.exports = mongoose.model('Place', orderSchema);
