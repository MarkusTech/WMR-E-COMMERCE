router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    const newUser = await User.create(user);
    res.status(
      (200).json({
        success: true,
        message: "User registed successfully",
        newUser,
      })
    );
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
