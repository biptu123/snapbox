const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "c.biptu.pc.mail@gmail.com",
    pass: "wszp lwki cgsn agtp",
  },
});

module.exports = transporter;
