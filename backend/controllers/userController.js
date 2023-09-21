import asyncHandler from "express-async-handler";

const registerUser = asyncHandler(async (req, res) => {
  res.send("Register User");
});

export { registerUser };
