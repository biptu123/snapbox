const mongoose = require("mongoose");

const CardInfoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      default: "free",
    },
    expiry_date: {
      type: Date,
      required: true,
    },
    starting_date: {
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
    designation: String,
    name: String,

    youtube: String,
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String,
    website: String,
    phone: String,
    location: String,
    whatsapp: String,
    email: String,
    sms: String,

    account_holder: String,
    bank_name: String,
    ifsc: String,
    account_no: String,

    services: [
      {
        title: String,
        description: String,
      },
    ],

    visiting_hours: [String],
    business_hours: [String],
    documents: [
      {
        name: String,
        url: String,
        public_id: String,
        file_type: String,
        folder: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("CardInfo", CardInfoSchema);
