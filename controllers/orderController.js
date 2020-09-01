Order = require('../models/orderModel');
const HttpError = require('../models/http-error');
transporter = require('../services/emailService');
const Email = require('email-templates');

// Get orders

const getOrders = async (req, res, next) => {
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
  order.name = req.body.name;
  order.lastName = req.body.lastName;
  order.address = req.body.address;
  order.notes = req.body.notes;
  order.city = req.body.city;
  order.postNumber = req.body.postNumber;
  order.state = req.body.state;
  order.email = req.body.email;
  order.phone = req.body.phone;
  order.qty = req.body.qty;
  order.price = req.body.price;

  order.save(function (err) {
    if (err) res.json(err);

    res.json({
      message: 'New order Added!',
      data: order,
    });
  });
};
exports.getOrders = getOrders;

/* const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Order = require('../models/order');

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
  try {
    let order = new Order();
    order.name = req.body.name;
    order.lastName = req.body.lastName;
    order.address = req.body.address;
    order.notes = req.body.notes;
    order.city = req.body.city;
    order.postNumber = req.body.postNumber;
    order.state = req.body.state;
    order.email = req.body.email;
    order.phone = req.body.phone;
    order.qty = req.body.qty;
    order.price = req.body.price;

    order.save(function (err) {
      if (err) {
        res.json(err);
      } else {
        res.json({
          status: 'success',
          message: 'Order submited successfully',
          data: order,
        });
      }
    });
  } catch (err) {
    const error = new HttpError(
      'Creating order failed, please try again.',
      500
    );
    return next(error);
  }
};

exports.getOrders = getOrders;
 */
