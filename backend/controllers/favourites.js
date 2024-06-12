const User = require("../models/user");
const Favourite = require("../models/favourites");

exports.getFavourites = async (req, res, next) => {
  const user = await User.findById({ _id: req.userId });
  if (!user) {
    res.status(401).json({ message: "Not Authenticated" });
  }
  const favourites = user?.favourites;
  return res.status(200).json({ favourites });
};

exports.getFavouritesWithPagination = async (req, res, next) => {
  const user = await User.findById({ _id: req.userId });
  if (!user) {
    res.status(401).json({ message: "Not Authenticated" });
  }
  const userId = req.userId;

  const page = +req.query.page || 1;
  const ITEM_PER_PAGE = 3;
  const SKIP = (page - 1) * ITEM_PER_PAGE;

  const totalFavourites = await Favourite.countDocuments({ userId });
  const favourites = await Favourite.find({ userId })
    .skip(SKIP)
    .limit(ITEM_PER_PAGE)
    .exec();

  return res.status(200).json({
    favourites,
    pagination: {
      totalPages: Math.ceil(totalFavourites / ITEM_PER_PAGE),
      currentPage: page,
    },
  });
};

exports.postFavourites = async (req, res, next) => {
  const { movie, media_type } = req.body || {};
  if (!movie) {
    return res
      .status(500)
      .json({ message: "Error sending the request. Please try again later." });
  }

  const favouriteMovie = new Favourite({
    userId: req.userId,
    imgSrc: movie.poster_path || movie.backdrop_path,
    title: movie.title || movie.name || movie.original_name,
    overview: movie.overview,
    id: movie.id,
    rating: movie.vote_average,
    release_date: movie.release_date,
    media_type: media_type,
  });
  try {
    let isUniqueInFavouritesCollection;
    const favMovies = await Favourite.find({ userId: req.userId });

    isUniqueInFavouritesCollection = favMovies.find(
      (movieDB) => movieDB.id === movie.id
    );
    if (!Boolean(isUniqueInFavouritesCollection)) {
      const addedMovie = await favouriteMovie.save();
      const user = await User.findById(req.userId);

      user.favourites.push({
        id: movie.id,
        imgSrc: movie.poster_path,
        title: movie.title || movie.name || movie.original_name,
        overview: movie.overview,
        rating: movie.vote_average,
        release_date: movie.release_date,
        media_type: media_type,
      });
      await user.save();

      return res
        .status(200)
        .json({ message: "Movie added to favourites.", favourite: addedMovie });
    } else {
      await Favourite.deleteOne({ userId: req.userId, id: movie.id });
      const user = await User.findById(req.userId);
      user.favourites = user.favourites.filter(
        (favMovie) => +favMovie.id !== movie.id
      );
      await user.save();
      return res.status(200).json({ message: "Movie removed from favourites" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};
