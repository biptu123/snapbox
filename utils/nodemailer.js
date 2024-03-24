const nodemailer = require("nodemailer");

// Replacing escaped newline characters with actual newline characters
const mailerPass = process.env.MAILER_PASS.replace(/\\n/g, "\n");

const transporter = nodemailer.createTransport({
  host: "mail.uniquesnapbox.in",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAILER_ID,
    pass: mailerPass,
  },
});

module.exports = transporter;
