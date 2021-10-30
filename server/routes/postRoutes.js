import express from 'express';
import {
  getPosts,
  addPost,
  updateMyPost,
  getMyPost,
} from '../controllers/postController.js';
import { protect } from '../middleware/auth.js'; // for private routes

const router = express.Router();

// endpoint => /api/posts
router.route('/').get(getPosts);
router.route('/new').post(protect, addPost);
router.route('/edit').put(protect, updateMyPost);

router.route('/profile').get(protect, getMyPost); // 마이페이지 용

export default router;
