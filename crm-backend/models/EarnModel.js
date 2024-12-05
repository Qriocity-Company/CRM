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
});

const EarnCustomers = mongoose.model("EarnCustomers", customerSchema);

module.exports = EarnCustomers;
