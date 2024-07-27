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
 
},{
  timestamps: true // This will add createdAt and updatedAt fields
});

const Doc = mongoose.model("Doc", DocSchema);

module.exports = Doc;
