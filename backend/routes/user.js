import express from "express";
import {
  registerUser,
  loginUser,
  logout,
  loadUser,
} from "../controllers/users.js";
import isAuthenticated from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/auth/me",isAuthenticated, loadUser);
router.get("/logout",isAuthenticated, logout);

export default router;
