const User = require("../models/User");
const CardInfo = require("../models/CardInfo");
const transporter = require("../utils/nodemailer");
const cron = require("node-cron");
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

const getUsersWithExpiryDateTomorrow = async () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const cardInfos = await CardInfo.find().populate("user");

  return cardInfos.filter(
    (cardInfo) =>
      new Date(cardInfo.expiry_date).setHours(0, 0, 0, 0) === tomorrow.getTime()
  );
};

const sendExpiryNotificationEmail = async (user, cardInfo) => {
  const mailOptions = {
    from: "uniquesnapbox@gmail.com",
    to: user.email,
    subject: "Your Plan is Expiring Soon",
    html: `
      <h2>Dear ${user.name || `User <${user.email}>`},</h2>
      <p>Your plan is expiring tomorrow.</p>
      <p>Please renew it to continue enjoying our services.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const BATCH_SIZE = 100;

const notifyUsersWithExpiringCards = async () => {
  try {
    const cardInfos = await getUsersWithExpiryDateTomorrow();

    for (let i = 0; i < cardInfos.length; i += BATCH_SIZE) {
      const batch = cardInfos.slice(i, i + BATCH_SIZE);

      const emailPromises = batch.map((cardInfo) =>
        sendExpiryNotificationEmail(cardInfo.user, cardInfo).catch((error) =>
          logger.error(
            `Failed to send email to ${cardInfo.user.email}: ${error.message}`
          )
        )
      );

      await Promise.all(emailPromises);
    }

    logger.info("Expiry notifications sent successfully");
  } catch (error) {
    logger.error("Error fetching users with expiring cards:", error.message);
  }
};

module.exports = {
  getUsersWithExpiryDateTomorrow,
  sendExpiryNotificationEmail,
  notifyUsersWithExpiringCards,
};
