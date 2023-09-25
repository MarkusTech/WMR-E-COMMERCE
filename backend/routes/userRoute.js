import express from "express";
import multer from "multer";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import { registerUser, activateUser } from "../controllers/userController.js";

const router = express.Router();

// Define the storage configuration for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.originalname.split("."[0]);
    cb(null, filename + "-" + uniqueSuffix + ".png");
  },
});

// Initialize Multer with the storage configuration
const upload = multer({ storage: storage });

router.post("/register", upload.single("file"), registerUser);
router.post("/activation", catchAsyncErrors, activateUser);

export default router;
