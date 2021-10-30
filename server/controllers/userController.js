import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import generateToken from "./utils/generateToken.js";

// @desc   Register a new user
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  // 회원가입 요청
  console.log(req.body);

  const { email, password, nickname } = req.body;

  // 이메일 중복 검사
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(401);
    throw new Error(`User already exists`);
  }

  const user = await User.create({
    email,
    password,
    nickname,
    image: `/images/users/${Math.floor(Math.random() * 5) + 1}.jpeg`,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
    });
  } else {
    // 필수 요구사항이 빈다면
    res.status(404);
    throw new Error("required element should be fullfilled");
  }
});

// @desc   Auth user & get token
// @route  Post /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  // 로그인 요청
  // req.body로 들어온 회원정보 이용.

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      nickname: user.nickname,
      email: user.email,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc   Get user profile
// @route  GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  // 회원 정보 요청
  // 토큰을 가지고 제한구역에 접근할 수 있다.
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      nickname: user.nickname,
      email: user.email,
      image: user.image,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc   Update user profile
// @route  PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
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
      image: user.image,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { registerUser, authUser, getUserProfile, updateUserProfile };
