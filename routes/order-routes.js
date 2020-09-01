let router = require('express').Router();

const orderController = require('../controllers/orderController');

router.route('/').get(orderController.getOrders).post(orderController.new);

module.exports = router;
