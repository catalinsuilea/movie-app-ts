const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movie = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  imgSrc: {
    type: String,
  },
  posterPath: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  release_date: {
    type: String,
  },
  overview: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Favourite", movie);
