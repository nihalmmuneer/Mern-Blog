import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { PostComment } from "../controllers/comment.controller.js";
import { getComments } from "../controllers/comment.controller.js";
import { likeComment } from "../controllers/comment.controller.js";
import { editComment } from "../controllers/comment.controller.js";
import { deleteComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", verifyToken, PostComment);
router.get("/getPostComments/:postId", verifyToken, getComments);
router.put("/likeComment/:commentId", verifyToken, likeComment);
router.put("/editComment/:commentId", verifyToken, editComment);
router.delete("/deleteComment/:commentId",verifyToken,deleteComment)

export default router;
