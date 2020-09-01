const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  notes: { type: String, required: false },
  city: { type: String, required: true },
  postNumber: { type: String, required: true },
  state: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  qty: { type: String, required: true },
  price: { type: String, required: true },
});

module.exports = mongoose.model('Place', orderSchema);

/* const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  notes: { type: String, required: false },
  city: { type: String, required: true },
  postNumber: { type: Number, required: true },
  state: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Order', orderSchema);
 */
