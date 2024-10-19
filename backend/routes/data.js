import express from "express";
import { uploadData , getData } from "../controllers/data.js";
import isAuthenticated from "../middleware/auth.js"
const router = express.Router();

router.post("/upload", uploadData);
router.get("/data", getData);

export default router;
