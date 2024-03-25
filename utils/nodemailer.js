const nodemailer = require("nodemailer");

// Replacing escaped newline characters with actual newline characters
const mailerPass = process.env.MAILER_PASS.replace(/\\n/g, "\n");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAILER_ID,
    pass: mailerPass,
  },
});

module.exports = transporter;
