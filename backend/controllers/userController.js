import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import sendToken from "../utils/jwtToken.js";

const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        } else {
          res.json({ message: "File deleted Successfully" });
        }
      });
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

    /* CREATE USER */
    // const newUser = await User.create(user);
    // res.status(200).json({
    //   success: true,
    //   message: "User registered successfully",
    //   newUser,
    // });

    const activationToken = createActivationToken(user);

    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    // send activation email via nodemailer
    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email:- ${user.email}  to activate your account`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// create activation token
const createActivationToken = (user) => {
  try {
    const token = jwt.sign(user, process.env.ACTIVATION_SECRET, {
      expiresIn: "5m",
    });
    return token;
  } catch (error) {
    console.error("Error creating activation token:", error);
    throw error; // Rethrow the error to be handled further up the call stack.
  }
};

// activate user
const activateUser = catchAsyncErrors(
  asyncHandler(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid Token", 400));
      }
      const { name, email, password, avatar } = newUser;

      let user = await User.findOne({ email });

      if (user) {
        return next(new ErrorHandler("User already exist", 400));
      }
      user = await User.create({
        name,
        email,
        avatar,
        password,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login user
const loginUser = catchAsyncErrors(
  asyncHandler(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// 304!

export { registerUser, activateUser, loginUser };
