import { errorHandler } from "../utils/error.js";
import Comment from "../models/comment.model.js";

export const PostComment = async (req, res, next) => {
  try {
    const { userId, postId, content } = req.body;

    if (req.user.id !== userId) {
      return next(errorHandler(401, "User cannot comment to the post"));
    }

    const newComment = new Comment({
      content: content,
      userId: userId,
      postId: postId,
    });
    await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};
