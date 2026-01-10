const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  message: { type: String },
  email: { type: String },
  year: { type: String },
  college: { type: String },
  department: { type: String },
  id: { type: String, required: true },
  date: { type: Date, default: Date.now },
  city: { type: String },
  source: { type: String },
});

const CustomerAds = mongoose.model("CustomerAds", customerSchema);

module.exports = CustomerAds;
