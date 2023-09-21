import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import ErrorHandler from "../utils/ErrorHandler";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }
  } catch (error) {
    throw new Error();
  }
});

export { registerUser };
