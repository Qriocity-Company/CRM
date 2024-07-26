const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const Link = mongoose.model("Link", LinkSchema);

module.exports = Link;
