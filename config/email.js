const nodemailer = require("nodemailer");

let transporter;

const initEmail = () => {
  transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,           // STARTTLS
    secure: false,       // must be false for port 587
    auth: {
      user: "apikey",                   // always "apikey"
      pass: process.env.SENDGRID_API_KEY, // your SendGrid API key
    },
    connectionTimeout: 10000, // 10s timeout
  });

  transporter
    .verify()
    .then(() => console.log("✅ Email transporter verified"))
    .catch((err) =>
      console.error("❌ Email transporter error:", err.message)
    );
};

const getTransporter = () => transporter;

module.exports = { initEmail, getTransporter };
