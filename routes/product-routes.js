let router = require('express').Router();

const productController = require('../controllers/productController');

router
  .route('/')
  .get(productController.getProducts)
  .post(productController.new);

module.exports = router;
