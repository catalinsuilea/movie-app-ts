const User = require("../models/user");
const Review = require("../models/ratingsAndReviews");
const { deleteReview } = require("../utils/deleteReview");
const { getReviews } = require("../utils/getReviews");

exports.postReviews = async (req, res, next) => {
  const { payload } = req.body || {};
  const {
    rating,
    reviewHeadlineValue,
    reviewTextAreaValue,
    mediaType,
    mediaName,
    mediaId,
    season,
    episode,
  } = payload || {};

  const user = await User.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isNotUniqueReview =
    user._id.toString() === req.userId &&
    user.reviews.find(
      (review) => review.mediaId === mediaId && review.mediaType === mediaType
    );

  if (isNotUniqueReview) {
    return res
      .status(403)
      .json({ message: `You already added a review for this ${mediaType}` });
  } else {
    const review = new Review({
      userId: req.userId,
      ratingValue: rating,
      reviewHeadline: reviewHeadlineValue,
      reviewContent: reviewTextAreaValue,
      mediaType: mediaType,
      mediaId: mediaId,
      mediaName: mediaName,
    });
    if (season !== undefined) {
      review.season = season;
    }
    if (episode !== undefined) {
      review.episode = episode;
    }
    await review.save();
    user.reviews.push(review);
    await user.save();

    return res.status(201).json({
      message: "Review added successfully",
      reviewData: review,
    });
  }
};

exports.getReviews = async (req, res, next) => {
  getReviews(req, res, Review);
};

exports.deleteReview = async (req, res, next) => {
  deleteReview(req, res, User, Review);
};
exports.editReview = async (req, res, next) => {
  const { payload } = req.body || {};
  const { rating, reviewHeadlineValue, reviewTextAreaValue, mediaId } =
    payload || {};
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const review = await Review.findOne({
      mediaId: mediaId,
      userId: req.userId,
    }).populate("userId", "username");

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.ratingValue = rating;
    review.reviewHeadline = reviewHeadlineValue;
    review.reviewContent = reviewTextAreaValue;

    await review.save();

    return res.status(200).json({
      message: "Review updated successfully",
      reviewData: review,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.postLike = async (req, res, next) => {
  const { reviewId } = req.body || {};

  const userId = req.userId;

  try {
    const review = await Review.findById(reviewId).populate(
      "userId",
      "username"
    );
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.reviewLikes.includes(userId)) {
      removeLike(review, userId);
    } else {
      review.reviewLikes.push(userId);
      removeDislike(review, userId);
    }
    await review.save();

    return res.status(200).json({
      message: "Review liked successfully",
      reviewData: review,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
exports.postDislike = async (req, res, next) => {
  const { reviewId } = req.body || {};

  const userId = req.userId;

  try {
    const review = await Review.findById(reviewId).populate(
      "userId",
      "username"
    );
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.reviewDislikes.includes(userId)) {
      removeDislike(review, userId);
    } else {
      review.reviewDislikes.push(userId);
      removeLike(review, userId);
    }
    await review.save();

    return res.status(200).json({
      message: "Review disliked successfully",
      reviewData: review,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const removeLike = (review, userId) => {
  return (review.reviewLikes = review.reviewLikes.filter(
    (user_id) => user_id.toString() !== userId.toString()
  ));
};

const removeDislike = (review, userId) => {
  return (review.reviewDislikes = review.reviewDislikes.filter(
    (user_id) => user_id.toString() !== userId.toString()
  ));
};

//Episodes
exports.getEpisodeReview = async (req, res, next) => {
  getReviews(req, res, Review);
};

exports.deleteEpisodeReview = async (req, res, next) => {
  deleteReview(req, res, User, Review);
};
