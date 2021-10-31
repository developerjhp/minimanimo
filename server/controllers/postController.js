import asyncHandler from 'express-async-handler';
import Post from '../models/post.js';

// @desc   Fetch all posts
// @route  GET /api/posts
// @access Public
const getPosts = asyncHandler(async (req, res) => {
  // 전체 게시물 요청
  const posts = await Post.find({})
    .populate('user', ['nickname', 'image'])
    .sort({ createdAt: 1 })
    .exec();
  if (posts) res.status(200).json(posts);
});

// @desc   Create new post
// @route  Post /api/posts/new
// @access Private
const addPost = asyncHandler(async (req, res) => {
  // 포스팅 추가 요청
  // req.body로 들어온 회원정보 이용.
  console.log(req.body);
  const { content } = req.body;

  if (!content) {
    res.status(400);
    throw new Error('There is no post');
    return;
  } else {
    const post = new Post({
      user: req.user._id,
      content,
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
  }
});

// @desc   update own post
// @route  PUT /api/posts/edit
// @access Private
const updateMyPost = asyncHandler(async (req, res) => {
  // 본인 게시물 수정 요청
  const post = await Post.findById(req.body._id);

  if (post) {
    post.content = req.body.content || post.content;

    const updatedPost = await post.save();

    res.json({
      _id: updatedPost._id,
      user: updatedPost.user,
      content: updatedPost.content,
      updatedAt: updatedPost.updatedAt,
    });
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});


// @desc   Delete user post
// @route  Delete /api/posts/delete
// @access Private
const deleteMyPost = asyncHandler(async (req, res) => {
  // 본인 게시물 삭제 요청
  await Post.deleteOne({ _id: req.body._id });
  res.status(200).json({
    message: 'Delete success',
  });
});


// @desc   Get user posts
// @route  GET /api/posts/profile
// @access Private
const getMyPosts = asyncHandler(async (req, res) => {
  // 본인 게시물 전체 요청
  const posts = await Post.find({ user: req.user._id });

  if (posts.length > 0) {
    const ownPosts = await posts.save();
    res.status(200).json(ownPosts);
  } else {
    res.status(404);
    throw new Error('Posts not found');
  }
});

export { getPosts, addPost, updateMyPost, deleteMyPost, getMyPosts };
