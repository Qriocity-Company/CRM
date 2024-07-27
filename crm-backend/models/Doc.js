const mongoose = require("mongoose");

const DocSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  uniqueLink: {
    type: String,
    required: true,
    unique: true,
  },
  docLink: {
    type: String,
    required: true,
  },
  newLink:{
    type:String,
    required:true,
  }
});

const Doc = mongoose.model("Doc", DocSchema);

module.exports = Doc;
