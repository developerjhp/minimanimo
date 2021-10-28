import asyncHandler from "express-async-handler";
import User from "../models/user.js";

// @desc   Validate a email address
// @route  POST /api/validate/email
// @access Public
const validateEmail = asyncHandler(async (req, res) => {
  // 이메일 유효성 확인

  const { email } = req.body;

  // 이메일 중복 검사
  const emailExists = await User.findOne({ email });

  if (emailExists) {
    res.status(401);
    throw new Error(`Email already exists`);
  }
  res.status(200).send("ok");
});

// @desc   Validate a nickname
// @route  POST /api/validate/nickname
// @access Public
const validateNickname = asyncHandler(async (req, res) => {
  // 닉네임 유효성 확인

  const { nickname } = req.body;

  // 이메일 중복 검사
  const nameExists = await User.findOne({ nickname });

  if (nameExists) {
    res.status(401);
    throw new Error(`Nickname already exists`);
  }
  res.status(200).send("ok");
});

export { validateEmail, validateNickname };
