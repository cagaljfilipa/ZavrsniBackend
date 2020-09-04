Order = require('../models/orderModel');
const HttpError = require('../models/http-error');
transporter = require('../services/emailService');
const Email = require('email-templates');

// Get orders
const getOrders = async (req, res, next) => {
  let orders;
  try {
    orders = await Order.find({});
  } catch (err) {
    const error = new HttpError(
      'Fetching orders failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({
    orders: orders.map((order) => order.toObject({ getters: true })),
  });
};

// Create order
exports.new = function (req, res) {
  console.log(req.body);
  let order = new Order();
  order.address = req.body.address;
  order.city = req.body.city;
  order.postNumber = req.body.postNumber;
  order.state = req.body.state;
  order.moneyTotal = req.body.moneyTotal;
  order.save(function (err) {
    if (err) res.json(err);
    const email = new Email();
    email
      .render('email')
      .then((result) => {
        const mailOptions = {
          from: 'glumcizagvozd@gmail.com',
          to: 'filipa.cagalj@gmail.com',
          subject: 'Potvrda narudžbe',
          html: result,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error, 'ErrorMail');
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        res.json({
          message: 'email sent',
        });
      })
      .catch((err) => {
        console.log(err, 'err email');
      });

    res.json({
      message: 'New order Added!',
      data: order,
    });
  });
};
exports.getOrders = getOrders;
