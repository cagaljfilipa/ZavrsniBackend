const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'glumcizagvozd@gmail.com',
    pass: 'Zagvozd123', // naturally, replace both with your real credentials or an application-specific password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
