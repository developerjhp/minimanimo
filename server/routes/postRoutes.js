import express from "express";
import {
  getPosts,
  addPost,
  updatePost,
  getMyPost,
} from "../controllers/postController.js";
import { protect } from "../middleware/auth.js"; // for private routes

const router = express.Router();

// endpoint => /api/posts
router.route("/").get(getPosts);
router.route("/new").post(addPost);
router.route("/edit").put(updatePost);

router.route("/profile").get(protect, getMyPost); // 내가 쓴 글 정보 요청

export default router;
