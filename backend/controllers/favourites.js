exports.getFavourites = (req, res, next) => {
  return res
    .status(200)
    .json({ message: "You can get the favourites movies from here!" });
};
