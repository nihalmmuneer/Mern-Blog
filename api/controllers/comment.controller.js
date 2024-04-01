import { errorHandler } from "../utils/error.js";
import Comment from "../models/comment.model.js";

export const PostComment = async (req, res, next) => {
  try {
    console.log("recieved postId:", req.body.postId);
    console.log("recieved userId:", req.body.userId);
    const { userId, postId, content } = req.body;

    if ((!userId, !postId, !content)) {
      return next(errorHandler(400, "Missing required fields"));
    }

    if (req.user.id !== userId) {
      return next(errorHandler(401, "User cannot comment to the post"));
    }

    const newComment = new Comment({
      content: content,
      userId: userId,
      postId: postId,
    });
    await newComment.save();

    res.status(200).json({ newComment });
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  try {
    console.log(req.params.commentId);
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return next(errorHandler(401, "Comments not found"));
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const editComment = async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) {
    return next(errorHandler(401, "comment not found"));
  }
  if (req.user.id !== comment.userId && !req.user.isAdmin) {
    return next(errorHandler(401, "Editing comment is not permitted"));
  }
  try {
    const commentEdit = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    res.status(200).json(commentEdit);

  } catch (error) {
    next(error);
  }
};
