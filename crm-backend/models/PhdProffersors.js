const mongoose = require("mongoose");

const phdProfessorSchema = new mongoose.Schema(
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

const PhdProffersors = mongoose.model("PhdProffersors", phdProfessorSchema);

module.exports = PhdProffersors;
