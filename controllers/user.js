const User = require("../models/User");
const CardInfo = require("../models/CardInfo");
const Payment = require("../models/Payment");
const slugify = require("slugify");
const transporter = require("../utils/nodemailer");
const cloudinary = require("../utils/cloudinary");

const getUserController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user)
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    else {
      return res.status(200).send({
        success: true,
        user,
      });
    }
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized Access",
    });
  }
};

const getSingleUserController = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    else {
      return res.status(200).send({
        success: true,
        user,
      });
    }
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized Access",
    });
  }
};

const getAllUserController = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users)
      return res.status(401).send({
        success: false,
        message: "Something went wrong",
      });
    else {
      return res.status(200).send({
        success: true,
        users,
      });
    }
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getCardInfoController = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user)
      return res.status(404).send({
        success: false,
        message: "User not found",
      });

    const cardInfo = await CardInfo.findOne({ user: user._id });
    if (!cardInfo)
      return res.status(404).send({
        success: false,
        message: "Card info not found for this user",
      });

    const currentDate = new Date().setHours(0, 0, 0, 0);
    const expiryDate = new Date(cardInfo.expiry_date).setHours(0, 0, 0, 0);

    if (expiryDate < currentDate) {
      return res.status(401).send({
        success: false,
        message: "Plan has expired",
      });
    }

    return res.status(200).send({
      success: true,
      cardInfo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getUnverifiedPaymentsController = async (req, res) => {
  try {
    const payments = await Payment.find({ isVerified: false }).populate("user");
    console.log(payments);
    if (!payments)
      return res.status(401).send({
        success: false,
        message: "Something went wrong",
      });
    return res.status(200).send({
      success: true,
      payments,
    });
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getVerifiedPaymentsController = async (req, res) => {
  try {
    const payments = await Payment.find({ isVerified: true }).populate("user");
    console.log(payments);
    if (!payments)
      return res.status(401).send({
        success: false,
        message: "Something went wrong",
      });
    return res.status(200).send({
      success: true,
      payments,
    });
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getPaymentsController = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.params.id });
    if (!payments)
      return res.status(401).send({
        success: false,
        message: "Something went wrong",
      });
    return res.status(200).send({
      success: true,
      payments,
    });
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const { name, image } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name });

    if (image) {
      const imageResult = await cloudinary.uploader.upload(image, {
        folder: "snapbox",
        quality: 60,
        width: 500,
        height: 500,
      });
      user.image = {
        public_id: imageResult.public_id,
        url: imageResult.secure_url,
      };
    }
    await user.save();
    if (!user)
      return res.status(401).send({
        success: false,
        message: "Something went wrong",
      });
    return res.status(200).send({
      success: true,
      user,
      message: "Updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const makeAdminController = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params._id, { role: 1 });

    if (!user)
      return res.status(401).send({
        success: false,
        message: "Something went wrong",
      });
    return res.status(200).send({
      success: true,
      user,
      message: "Updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getDetailsController = async (req, res) => {
  try {
    const users = await User.find({});
    const activeUser = await User.find({ isVerified: true });
    const payments = await Payment.find({});
    const unverified = await Payment.find({ isVerified: false });

    return res.status(200).send({
      success: true,
      details: {
        unverified_payments: unverified.length,
        total_payments: payments.length,
        users: users.length,
        active_users: activeUser.length,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const applyController = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, phoneno, service } = req.body;

    // validation
    if (!email || !name || !phoneno || !service) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    // Create email message
    const mailOptions = {
      from: "uniquesnapbox@gmail.com",
      to: process.env.MAILER_ID,
      subject: `New Application For ${service}`,
      html: `
              <h2>New Application For ${service}</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone No:</strong> ${phoneno}</p>
            `,
    };

    const emailresponse = await transporter.sendMail(mailOptions);
    console.log(emailresponse);

    res.status(200).send({
      success: true,
      message: "Application sent successfully. We will contact you soon",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getUserController,
  getAllUserController,
  getSingleUserController,
  getCardInfoController,
  getUnverifiedPaymentsController,
  getPaymentsController,
  updateUserController,
  getVerifiedPaymentsController,
  makeAdminController,
  getDetailsController,
  applyController,
};
