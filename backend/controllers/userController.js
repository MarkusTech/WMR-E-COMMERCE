import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import path from "path";

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const avatarUrl = {
      public_id: filename,
      url: fileUrl,
    };
    const user = {
      name: name,
      email: email,
      password: password,
      avatar: avatarUrl,
    };

    const newUser = await User.create(user);
    res.status(200).json({
      success: true,
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// 2:29.48

export { registerUser };
