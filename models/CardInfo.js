const mongoose = require("mongoose");

const CardInfoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    expiry_date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },

    cover_img: {
      public_id: String,
      url: String,
    },
    profile_img: {
      public_id: String,
      url: String,
    },
    title: String,
    subtitle: String,
    description: String,
    name: String,
    youtube: String,
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String,
    website: String,
    phone: String,
    location: String,

    services: [
      {
        title: String,
        description: String,
      },
    ],

    visiting_hours: [String],
    business_hours: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("CardInfo", CardInfoSchema);
