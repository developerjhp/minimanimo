import asyncHandler from "express-async-handler";
import Post from "../models/post.js";

// @desc   Fetch all posts
// @route  GET /api/posts
// @access Public
const getPosts = asyncHandler(async (req, res) => {
  // 전체 게시물 요청
  const posts = await Post.find({});
  res.status(200).json(posts);
});

// @desc   Create new post
// @route  Post /api/posts/new
// @access Public
const addPost = asyncHandler(async (req, res) => {
  // 로그인 요청
  // req.body로 들어온 회원정보 이용.
  console.log(req.body)
  const { content, user } = req.body;

  if (!content) {
    res.status(400);
    throw new Error("There is no post");
    return;
  } else {
    const post = new Post({
      user: user._id,
      content,
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
  }
});

// @desc   update user post
// @route  PUT /api/posts/edit
// @access Private
const updatePost = asyncHandler(async (req, res) => {
  // 게시물 수정 요청
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      nickname: user.nickname,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc   Get user posts
// @route  GET /api/posts/profile
// @access Private
const getMyPost = asyncHandler(async (req, res) => {
  // 회원 정보 수정 요청
  // 수정 요청으로 들어온 데이터로 변경해 저장한다.

  const user = await User.findById(req.user._id);

  if (user) {
    user.nickname = req.body.nickname || user.nickname;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      nickname: updatedUser.nickname,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { getPosts, addPost, updatePost, getMyPost };
