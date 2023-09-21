import express from "express";
import multer from "multer";
import { registerUser } from "../controllers/userController.js";

const router = express.Router();

// Define the storage configuration for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Initialize Multer with the storage configuration
const upload = multer({ storage: storage });

router.post("/register", upload.single("file"), registerUser);

export default router;
