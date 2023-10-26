import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";

const isAuthenticated = catchAsyncErrors(
  asyncHandler(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
      return next(new ErrorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);

    next();
  })
);

const isSeller = catchAsyncErrors(
  asyncHandler(async (req, res, next) => {
    const { seller_token } = req.cookies;
    if (!seller_token) {
      return next(new ErrorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

    req.seller = await Shop.findById(decoded.id);

    next();
  })
);

const isAdmin = catchAsyncErrors(
  asyncHandler(async (req, res, next) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHandler(`${req.user.role} can not access this resources!`)
        );
      }
      next();
    };
  })
);

export { isAuthenticated, isSeller, isAdmin };
