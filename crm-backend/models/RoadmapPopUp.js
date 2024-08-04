const mongoose = require("mongoose");

const roadmapPopUpSchema = new mongoose.Schema({
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

const RoadmapPopUp = mongoose.model("RoadmapPopUp", roadmapPopUpSchema);
module.exports = RoadmapPopUp;
