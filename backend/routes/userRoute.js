import express from "express";
const router = express.Router();
import { upload } from "../multer.js";
import { registerUser } from "../controllers/userController.js";

router.post("/register", upload.single("file"), registerUser);

export default router;
