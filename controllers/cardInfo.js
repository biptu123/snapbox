const User = require("../models/User");
const CardInfo = require("../models/CardInfo");
const transporter = require("../utils/nodemailer");
const cloudinary = require("../utils/cloudinary");

const uploadImagesController = async (req, res) => {
  try {
    const { profilePicture, coverPicture } = req.body;

    const user = await User.findById(req.user._id);
    const cardInfo = await CardInfo.findOne({ user: user._id });
    if (!user)
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    if (profilePicture) {
      const profilePictureResult = await cloudinary.uploader.upload(
        profilePicture,
        {
          folder: "snapbox",
          quality: 60,
          width: 500,
          height: 500,
        }
      );
      cardInfo.profile_img = {
        public_id: profilePictureResult.public_id,
        url: profilePictureResult.secure_url,
      };
    }

    if (coverPicture) {
      const coverPictureResult = await cloudinary.uploader.upload(
        coverPicture,
        {
          folder: "snapbox",
          quality: 60,
          width: 500,
          height: 500,
        }
      );
      cardInfo.cover_img = {
        public_id: coverPictureResult.public_id,
        url: coverPictureResult.secure_url,
      };
    }

    await cardInfo.save();
    return res.status(200).send({
      success: true,
      message: "Images Uploaded Successfully",
      cardInfo,
    });
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateBasicController = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      name,
      description,
      youtube,
      facebook,
      phone,
      location,
      instagram,
      twitter,
      linkedin,
      website,
      whatsapp,
      sms,
      email,
    } = req.body;
    // if (
    //   !title ||
    //   !subtitle ||
    //   !name ||
    //   !description ||
    //   !youtube ||
    //   !facebook ||
    //   !phone ||
    //   !location
    // ) {
    //   return res.status(400).send({
    //     success: false,
    //     message: "All fields are required",
    //   });
    // }
    const user = await User.findById(req.user._id);
    const cardInfo = await CardInfo.findOne({ user: user._id });
    if (!user)
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });

    cardInfo.title = title;
    cardInfo.subtitle = subtitle;
    cardInfo.name = name;
    cardInfo.description = description;
    cardInfo.youtube = youtube;
    cardInfo.facebook = facebook;
    cardInfo.phone = phone;
    cardInfo.location = location;
    cardInfo.instagram = instagram;
    cardInfo.twitter = twitter;
    cardInfo.linkedin = linkedin;
    cardInfo.website = website;
    cardInfo.whatsapp = whatsapp;
    cardInfo.email = email;
    cardInfo.sms = sms;

    await cardInfo.save();
    return res.status(200).send({
      success: true,
      message: "Updated Successfully",
    });
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateServiceController = async (req, res) => {
  try {
    const { services } = req.body;
    if (!services || services.length < 2) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findById(req.user._id);
    const cardInfo = await CardInfo.findOne({ user: user._id });
    if (!user)
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });

    cardInfo.services = services;

    await cardInfo.save();
    return res.status(200).send({
      success: true,
      message: "Updated Successfully",
    });
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateScheduleController = async (req, res) => {
  try {
    const { visiting_hours, business_hours } = req.body;
    // if (!services || services.length < 2) {
    //   return res.status(400).send({
    //     success: false,
    //     message: "All fields are required",
    //   });
    // }
    const user = await User.findById(req.user._id);
    const cardInfo = await CardInfo.findOne({ user: user._id });
    if (!user)
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });

    cardInfo.visiting_hours = visiting_hours;
    cardInfo.business_hours = business_hours;

    await cardInfo.save();
    return res.status(200).send({
      success: true,
      message: "Updated Successfully",
    });
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateCardController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    }

    let cardInfo = await CardInfo.findOne({ user: user._id });
    if (!cardInfo) {
      return res.status(404).send({
        success: false,
        message: "Card Info not found",
      });
    }

    // Update the cardInfo object with the request body
    Object.assign(cardInfo, req.body);
    await cardInfo.save();

    return res.status(200).send({
      success: true,
      message: "Updated Successfully",
      cardInfo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const bookAppointmentController = async (req, res) => {
  try {
    const { name, user, date, time, phoneno } = req.body;

    // validation
    if (!user || !name || !date || !time || !phoneno) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    const cardOwner = await User.findById(user);
    console.log(cardOwner);
    const email = cardOwner.email;
    // Create email message
    const mailOptions = {
      from: process.env.MAILER_ID,
      to: email,
      subject: "New Appointment",
      html: `
              <h2>New Appointment</h2>
              <p>Hello <strong>${cardOwner.username}</strong> An appointment has been booked by an user using your visiting card </p>
              <p><strong>Here are the Details: </strong></p>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Phoneno:</strong> ${phoneno}</p>
              <p><strong>Date:</strong> ${date}</p>
              <p><strong>Time:</strong> ${time}</p>
              <p><strong>You can confirm the appointment by calling using the given number</strong></p>
            `,
    };
    console.log(mailOptions);

    const emailresponse = await transporter.sendMail(mailOptions);

    res.status(200).send({
      success: true,
      message:
        "Your Appointment has been booked successfully They will call you to confirm in a while",
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
  uploadImagesController,
  updateBasicController,
  updateServiceController,
  updateScheduleController,
  updateCardController,
  bookAppointmentController,
};
