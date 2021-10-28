import express from "express";
import {
  validateEmail,
  validateNickname,
} from "../controllers/validateController";
const router = express.Router();

// endpoint => /api/validate
router.route("/email").post(validateEmail);
router.route("/nickname").post(validateNickname);

export default router;
