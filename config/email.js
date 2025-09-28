const nodemailer = require('nodemailer');

let transporter;

const initEmail = () => {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const getTransporter = () => transporter;

module.exports = { initEmail, getTransporter };
