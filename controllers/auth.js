const {
  hashPassword,
  comparePassword,
  generateVerificationToken,
} = require("../helpers/auth");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const transporter = require("../utils/nodemailer");
const url = require("url");

const SignupController = async (req, res) => {
  try {
    console.log(req.body);
    const { email, username, password } = req.body;

    // validation
    if (!email || !username || !password) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    // Additional validation (e.g., email format) can be added here

    let user = await User.findOne({ $or: [{ email }, { username }] });

    if (user && user.isVerified) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }

    // Generate email verification token
    const verificationToken = generateVerificationToken();
    const hashedPassword = await hashPassword(password);

    if (!user) {
      user = new User({
        email,
        username,
        password: hashedPassword,
        isVerified: false,
      });
    }

    // Save the user with verification token
    user.email = email;
    user.username = username;
    user.password = hashedPassword;
    user.verificationToken = verificationToken;

    await user.save();
    const verificationURL = url.format({
      protocol: req.protocol,
      host: req.get("host"),
      pathname: `/verify/${verificationToken}`,
    });

    const emailresponse = await transporter.sendMail({
      from: "your_email@example.com",
      to: email,
      subject: "Email Verification",
      html: `<p>Hello ${username},</p><p>Please click <a href="${verificationURL}">here</a> to verify your email address.</p>`,
    });
    console.log(emailresponse);

    res.status(200).send({
      success: true,
      message: "User created successfully. Verification email sent.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};
const VerifyController = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Token not found" });
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "User verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const LoginController = async (req, res) => {
  console.log("Here");
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Username/email and password are required",
      });
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username/email or password",
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "Account not verified. Please verify your email to login.",
      });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid username/email or password",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .status(200)
      .json({ success: true, token, message: "Login Successfull" });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  LoginController,
  SignupController,
  VerifyController,
};
