const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  photoURL: { type: String, required: false },
});

module.exports = mongoose.model('Product', productSchema);
