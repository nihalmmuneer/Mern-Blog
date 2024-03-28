import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createPost,
  getPosts,
  deletePost,
  updatePosts,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createPost);
router.get("/get-posts", getPosts);
router.delete("/delete-post/:postId/:userId", verifyToken, deletePost);
router.put("/update-posts/:postId/:userId", verifyToken, updatePosts);

export default router;
