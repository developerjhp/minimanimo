const express = require('express')
const {
  validateEmail,
  validateNickname,
} = require('../controllers/validateController')

// import {
//   validateEmail,
//   validateNickname,
// } from "../controllers/validateController.js";

const router = express.Router();

// endpoint => /api/validate
router.route("/email").post(validateEmail);
router.route("/nickname").post(validateNickname);

module.exports = router;
