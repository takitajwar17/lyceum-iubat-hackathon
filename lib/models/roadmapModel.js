import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  content: {
    type: Object,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Roadmap = mongoose.models.Roadmap || mongoose.model("Roadmap", roadmapSchema);

export default Roadmap;
