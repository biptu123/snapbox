const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    card: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CardInfo",
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: Number,
      default: 0,
    },
    image: {
      public_id: String,
      url: String,
    },
    name: {
      type: String,
    },
    otp: {
      type: Number,
    },
    appointments: [
      {
        date: Date,
        time: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
