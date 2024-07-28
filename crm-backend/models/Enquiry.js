const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },
});

const Enquiry = mongoose.model("Enquiry", enquirySchema);
module.exports = Enquiry;
