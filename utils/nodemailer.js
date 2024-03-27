const nodemailer = require("nodemailer");

// Replacing escaped newline characters with actual newline characters
const mailerPass = process.env.MAILER_PASS.replace(/\\n/g, "\n");

// const transporter = nodemailer.createTransport({
//   host: process.env.MAILER_HOST,
//   port: parseInt(process.env.MAILER_PORT), // Explicitly convert to integer
//   secure: process.env.MAILER_IS_SECURE === "true", // Convert string "true" to boolean true
//   auth: {
//     user: process.env.MAILER_ID,
//     pass: mailerPass,
//   },
// });

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
