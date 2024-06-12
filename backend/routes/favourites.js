const express = require("express");

const route = express.Router();

const isAuth = require("../middlewares/authProtect");

const favouritesController = require("../controllers/favourites");

route.get("/get-favourites", isAuth, favouritesController.getFavourites);

route.get(
  "/get-favourites/pagination",
  isAuth,
  favouritesController.getFavouritesWithPagination
);

route.post("/post-favourites", isAuth, favouritesController.postFavourites);

module.exports = route;
