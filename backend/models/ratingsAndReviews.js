const mongoose = require("mongoose");
const ReviewsSchema = require("./reviewsSchema");

const Review = mongoose.model("Review", ReviewsSchema);

module.exports = Review;
