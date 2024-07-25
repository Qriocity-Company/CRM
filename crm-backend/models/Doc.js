import mongoose from "mongoose";

const DocSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  uniqueLink: { type: String, required: true, unique: true },
  docLink: { type: String, required: true },
});

export default mongoose.model("Doc", DocSchema);
