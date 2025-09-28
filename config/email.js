const nodemailer = require('nodemailer');

let transporter;

const initEmail = () => {
  if (transporter) return transporter; // prevent re-initialization

  transporter = nodemailer.createTransport({
    service: 'gmail', // simpler than specifying host/port manually
    auth: {
      user: process.env.EMAIL_USER, // Gmail email
      pass: process.env.EMAIL_PASS, // Gmail App Password, NOT your regular password
    },
    secure: true,
    connectionTimeout: 10000, // 10 seconds
  });

  // Verify transporter
  transporter.verify((err, success) => {
    if (err) {
      console.error('❌ Email transporter error:', err.message);
    } else {
      console.log('✅ Email transporter ready');
    }
  });

  return transporter;
};

const getTransporter = () => {
  if (!transporter) throw new Error('Transporter not initialized. Call initEmail() first.');
  return transporter;
};

module.exports = { initEmail, getTransporter };
