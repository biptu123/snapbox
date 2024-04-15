const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
      required: true,
    },
    transaction_id: {
      type: String,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    days: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
