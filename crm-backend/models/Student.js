const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
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
  college: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;