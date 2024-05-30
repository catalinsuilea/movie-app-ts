const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavouriteSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  imgSrc: String,
  title: String,
  overview: String,
  rating: Number,
  release_date: String,
  media_type: String,
  original_name: String,
});

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favourites: [FavouriteSchema],
});
module.exports = mongoose.model("User", UserSchema);
