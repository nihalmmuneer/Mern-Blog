import express from "express";
import { test } from "../controllers/user.controller.js";
import { updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

// router.get("/test", (req, res) => {
//   res.json({ message: "Api working successfully" });
// });
router.get("/test", test);

router.put("/user-update/:user_id", verifyToken, updateUser);
router.delete("/delete/:user_id",verifyToken,deleteUser)

export default router;
