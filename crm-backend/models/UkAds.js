const mongoose = require("mongoose");

const ukCustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    requirement: { type: String },
    fieldOfStudy: { type: String },
    email: { type: String },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

const UkCustomerAds = mongoose.model("UkCustomerAds", ukCustomerSchema);

module.exports = UkCustomerAds;
