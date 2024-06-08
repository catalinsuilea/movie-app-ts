const User = require("../models/user");
const fs = require("fs");

exports.getUserReviews = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ reviews: user.reviews });
};

exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({
    user: { username: user.username, profile_picture: user.profile_picture },
  });
};

exports.postUpload = async (req, res, next) => {
  const filePath = req?.file?.path?.replace(/\\/g, "/");
  if (!filePath) {
    return res.status(404).json({ message: "Please upload a file" });
  }
  const user = await User.findOne({ _id: req.userId });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.profile_picture) {
    try {
      fs.unlinkSync(user.profile_picture);
    } catch (error) {
      console.error("Error deleting old profile picture:", error);
    }
  }
  user.profile_picture = filePath;
  await user.save();

  return res.status(200).json({
    user_profile_picture: filePath,
    message: "Image uploaded successfully",
  });
};
