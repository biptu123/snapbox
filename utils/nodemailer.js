const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAILER_ID,
    pass: process.env.MAILER_PASS,
  },
});

module.exports = transporter;
