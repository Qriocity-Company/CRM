const mongoose = require("mongoose");

const hardwareSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    message: { type: String },
    email: { type: String },
    year: { type: String },
    college: { type: String },
    department: { type: String },
    id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const HardwareSchema = mongoose.model("HardwareSchema", hardwareSchema);

module.exports = HardwareSchema;
