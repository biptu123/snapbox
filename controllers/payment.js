const CardInfo = require("../models/CardInfo");
const Payment = require("../models/Payment");
const User = require("../models/User");
const slugify = require("slugify");

const freeSubscribeController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user)
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });

    if (user.card) {
      return res.status(401).send({
        success: false,
        message: "You already used your free subscription",
      });
    }

    const payment = await Payment.create({
      user: req.user._id,
      amount: 0,
      transaction_id: "N/A",
      isVerified: true,
    });

    // Calculate the expiry date 10 days from now
    const tenDaysLater = new Date();
    tenDaysLater.setDate(tenDaysLater.getDate() + 10);

    // Create a new CardInfo document with the calculated expiry date
    const card = await CardInfo.create({
      user: req.user._id,
      expiry_date: tenDaysLater,
    });

    user.card = card._id;
    await user.save();

    return res.status(200).send({
      success: true,
      user,
      message: "Payment successfull",
    });
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const paidSubscribeController = async (req, res) => {
  const { amount, days, transactionId } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user)
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });

    let card = await CardInfo.findOne({ user: payment.user });
    if (!card) {
      days = parseInt(days) + 10;
    }

    const payment = await Payment.create({
      user: req.user._id,
      amount: parseInt(amount),
      transaction_id: transactionId,
      days: days,
    });

    return res.status(200).send({
      success: true,
      user,
      message: "Payment successfull Wait until we verify the transaction",
    });
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const approvePaymentController = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    const user = await User.findById(payment.user);
    if (!payment)
      return res.status(404).send({
        success: false,
        message: "Payment not found",
      });

    let card = await CardInfo.findOne({ user: payment.user });

    // If card doesn't exist, create a new one
    if (!card) {
      card = await CardInfo.create({
        user: req.user._id,
        expiry_date: new Date(), // Initialize expiry date to current date
      });
    }

    // Calculate expiry date by adding payment days to current date
    const newExpiryDate = new Date(card.expiry_date);
    newExpiryDate.setDate(newExpiryDate.getDate() + parseInt(payment.days));
    card.expiry_date = newExpiryDate;

    // Save updated card info
    await card.save();

    // Update user's card reference
    user.card = card._id;
    await user.save();

    payment.isVerified = true;
    await payment.save();

    return res.status(200).send({
      success: true,
      message: "Payment approved",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const rejectPaymentController = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment)
      return res.status(404).send({
        success: false,
        message: "Payment not found",
      });

    payment.isVerified = null;
    await payment.save();

    return res.status(200).send({
      success: true,
      message: "Payment rejected",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  freeSubscribeController,
  paidSubscribeController,
  approvePaymentController,
  rejectPaymentController,
};
