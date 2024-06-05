const express = require("express");
const isAuth = require("../middlewares/authProtect");
const reviewsController = require("../controllers/reviews");
const route = express.Router();

route.post("/add-review", isAuth, reviewsController.postReviews);

route.get("/get-reviews/:mediaType/:mediaId", reviewsController.getReviews);

route.delete("/delete-review/:id", isAuth, reviewsController.deleteReview);

route.put("/edit-review", isAuth, reviewsController.editReview);

route.post("/like-review", isAuth, reviewsController.postLike);

route.post("/dislike-review", isAuth, reviewsController.postDislike);

// Episodes

route.get(
  "/get-reviews-episode/:mediaId/:mediaType/:season/:episode",
  reviewsController.getEpisodeReview
);

route.delete(
  "/delete-review/:season/:episode/:id",
  isAuth,
  reviewsController.deleteEpisodeReview
);

module.exports = route;
