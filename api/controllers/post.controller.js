import { errorHandler } from "../utils/error.js";
import POST from "../models/post.model.js";

export const createPost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(401, "User cannot create a post"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(401, "Please provide all required fields"));
  }
  const slug = req.body.title
    .split("")
    .join("")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "-");
  const newPost = new POST({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savePost = await newPost.save();
    res.status(201).json(savePost);
  } catch (error) {
    next(error);
  }
};
