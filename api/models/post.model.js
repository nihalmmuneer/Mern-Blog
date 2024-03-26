// import mongoose
import mongoose from "mongoose";

// Providing a set of rules

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg?size=626&ext=jpg&ga=GA1.1.98259409.1711238400&semt=ais",
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    category: {
      type: String,
      default: "select",
    },
  },
  { timestamps: true }
);

const POST = mongoose.model("POST", postSchema);
export default POST;
