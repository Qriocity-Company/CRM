const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String },
  year: { type: String },
  department: { type: String },
},{
    timestamps:true
});

const BookConsulations = mongoose.model("BookConsultations", customerSchema);

module.exports = BookConsulations;
