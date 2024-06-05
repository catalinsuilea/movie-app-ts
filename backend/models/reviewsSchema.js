const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ratingValue: {
    required: true,
    type: Number,
  },
  reviewHeadline: {
    required: true,
    type: String,
  },
  reviewContent: {
    required: true,
    type: String,
  },
  reviewLikes: [{ type: Schema.Types.ObjectId, ref: "User" }],

  reviewDislikes: [{ type: Schema.Types.ObjectId, ref: "User" }],

  createdAt: {
    type: Date,
    default: Date.now,
  },
  mediaType: {
    type: String,
    required: true,
  },
  mediaId: {
    type: Number,
    required: true,
  },
  mediaName: {
    type: String,
    required: true,
  },
  episode: { type: Number },
  season: { type: Number },
});

module.exports = ReviewsSchema;
