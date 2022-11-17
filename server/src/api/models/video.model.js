import mongoose, { Schema } from "mongoose";

const VideoSchema = new Schema({
  videoId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  firstSearch: {
    type: Date,
    required: true,
  },
  latestSearch: {
    type: Date,
    required: true,
  },
  comments: {
    type: Array,
    required: true,
  },
});

export default mongoose.model("Video", VideoSchema);
