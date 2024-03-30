import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { PostComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", verifyToken, PostComment);

export default router;
