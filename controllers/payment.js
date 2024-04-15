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
      isVerified: true,
      type: "Free Plan",
    });

    // Calculate the expiry date 15 days from now
    const tenDaysLater = new Date();
    tenDaysLater.setDate(tenDaysLater.getDate() + 15);

    // Create a new CardInfo document with the calculated expiry date
    const card = await CardInfo.create({
      user: req.user._id,
      starting_date: new Date(),
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
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const paidSubscribeController = async (req, res) => {
  const { amount, days, transactionId, type } = req.body;
  try {
    if (!transactionId) {
      return res.status(401).send({
        success: false,
        message: "Transaction Id required",
      });
    }
    const user = await User.findById(req.user._id);
    if (!user)
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });

    const payment = await Payment.create({
      user: req.user._id,
      amount: parseInt(amount),
      transaction_id: transactionId,
      days: days,
      type,
    });

    return res.status(200).send({
      success: true,
      user,
      message: "Payment successfull Wait until we verify the transaction",
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.transaction_id === 1) {
      return res.status(401).send({
        success: false,
        message:
          "Transaction ID already exists. If you still have any problem please contact us",
      });
    }
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
        user: payment.user,
        starting_date: new Date(),
        expiry_date: new Date(),
      });
    }

    console.log(card);
    // Calculate expiry date by adding payment days to current date
    const newExpiryDate = new Date();
    newExpiryDate.setDate(newExpiryDate.getDate() + parseInt(payment.days));
    card.starting_date = new Date();
    card.expiry_date = newExpiryDate;
    card.type = payment.type;

    console.log(newExpiryDate);

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
    // console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const rejectPaymentController = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
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
