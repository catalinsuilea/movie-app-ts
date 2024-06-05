const deleteReview = async (req, res, User, Review) => {
  const { id, season, episode } = req.params || {};

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const query = {
      mediaId: id,
      userId: req.userId,
    };

    if (season !== undefined && episode !== undefined) {
      query.season = Number(season);
      query.episode = Number(episode);
    }

    const review = await Review.findOne(query);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    await Review.deleteOne(query);

    user.reviews = user.reviews.filter(
      (reviewDB) => reviewDB._id.toString() !== review._id.toString()
    );

    await user.save();

    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { deleteReview };
