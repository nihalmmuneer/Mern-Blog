import mongoose from "mongoose";

const commentShema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },

    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    numberOfLikers: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentShema);

export default Comment;