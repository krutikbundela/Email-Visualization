import express from "express";
import {
  uploadData,
  getData,
  getDefaultPreferences,
} from "../controllers/data.js";
import isAuthenticated from "../middleware/auth.js"
const router = express.Router();

router.post("/upload", uploadData);
router.get("/data",isAuthenticated, getData);
router.get("/default/preferences", isAuthenticated, getDefaultPreferences);

export default router;
