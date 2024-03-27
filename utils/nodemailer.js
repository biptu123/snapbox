const nodemailer = require("nodemailer");

// Replacing escaped newline characters with actual newline characters
const mailerPass = process.env.MAILER_PASS.replace(/\\n/g, "\n");

const transporter = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  secure: process.env.MAILER_IS_SECURE,
  auth: {
    user: process.env.MAILER_ID,
    pass: mailerPass,
  },
});

module.exports = transporter;
