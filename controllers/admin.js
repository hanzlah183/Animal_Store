const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/admin");

// @desc      Register Admin
// @route     POST /api/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  let user = await User.findOne();

  if (user) {
    return next(new ErrorResponse("Admin Already Register ", 400));
  }

  const { name, email, password } = req.body;

  // Create user
  user = await User.create({
    name,
    email,
    password
  });

  // Create token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

// @desc      Login Admin
// @route     POST /api/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate emil & password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Create token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

// @desc      Get current logged in user
// @route     Get /api/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  
  const user = await User.findById(req.user.id).select("-role").select("-email").select("-_id").select("-createdAt")
  res.status(200).json(user);
});
