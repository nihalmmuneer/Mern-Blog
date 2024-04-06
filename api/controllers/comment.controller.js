import { errorHandler } from "../utils/error.js";
import Comment from "../models/comment.model.js";

export const PostComment = async (req, res, next) => {
  try {
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
export const deleteComment = async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) {
    return next(errorHandler(401, "Comment not Found"));
  }
  if (req.user.id !== comment.userId && !req.user.isAdmin) {
    return next(errorHandler(401, "Comment Cannot be deleted"));
  }
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json("Comment has been deleted");
  } catch (error) {
    next(error);
  }
};

export const getcomments = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(401, "Not possible to get comments list"));
  }
  const startIndex = parseInt(req.params.startIndex) || 0;
  const limit = parseInt(req.params.limit) || 9;
  const sortDirection = req.params.sort === "asc" ? 1 : -1;

  const comments = await Comment.find()
    .sort({ createdAt: sortDirection })
    .skip(startIndex)
    .limit(limit);

  // total number of comments

  const totalComments = await Comment.countDocuments();

  // Counting number of comments from last month

  const now = new Date();

  const oneMonthAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate()
  );

  const lastMonthComments = await Comment.countDocuments({
    createdAt: { $gte: oneMonthAgo },
  });
  res.status(200).json({
    comments,
    totalComments,
    lastMonthComments,
  });
};
