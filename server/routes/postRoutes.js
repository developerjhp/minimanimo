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
router.route("/new").post(protect, addPost); // 로그인한 유저만 요청 가능
router.route("/edit").put(updatePost);

router.route("/profile").get(protect, getMyPost); // 내가 쓴 글 정보 요청

export default router;
