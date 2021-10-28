import express from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js"; // for private routes

const router = express.Router();

// endpoint => /api/users
router.route("/").post(registerUser); // 회원가입 요청
router.route("/login").post(authUser); // 로그인 요청
router
  .route("/profile")
  .get(protect, getUserProfile) // 마이페이지 유저 프로필 정보 요청
  .put(protect, updateUserProfile); // 마이페이지 유저 프로필 정보 수정 요청

export default router;
