const getReviews = async (req, res, Review) => {
  const { mediaId, mediaType, season, episode } = req.params;
  try {
    const query = {
      mediaId: mediaId,
      mediaType: mediaType,
    };
    if (season !== undefined && episode !== undefined) {
      query.season = season;
      query.episode = episode;
    }
    const reviews = await Review.find(query).populate("userId", "username");
    if (!reviews) {
      return res
        .status(404)
        .json({ message: `No reviews found for this ${mediaType}` });
    }

    return res.status(200).json({ reviewData: reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { getReviews };
