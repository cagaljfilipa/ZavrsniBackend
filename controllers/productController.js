Product = require('../models/productModel');
const HttpError = require('../models/http-error');

// Get products
const getProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find({});
  } catch (err) {
    const error = new HttpError(
      'Fetching products failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({
    products: products.map((product) => product.toObject({ getters: true })),
  });
};

// Create product
exports.new = function (req, res) {
  console.log(req.body);
  let product = new Product();
  product.name = req.body.name;
  product.description = req.body.description;
  product.price = req.body.price;
  product.photoURL = req.body.photoURL;
  product.save(function (err) {
    if (err) res.json(err);
    res.json({
      message: 'New product added!',
      data: product,
    });
  });
};

exports.getProducts = getProducts;
