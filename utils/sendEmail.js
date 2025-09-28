const { getTransporter } = require('../config/email');

const sendEmail = async (subject, text, toEmail = process.env.ADMIN_EMAIL) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject,
      text,
    };

    const info = await getTransporter().sendMail(mailOptions);
    console.log("✉️ Email sent:", info.response);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
  }
};

module.exports = sendEmail;
