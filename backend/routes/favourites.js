const express = require("express");

const route = express.Router();

const isAuth = require("../middlewares/authProtect");

const favouritesController = require("../controllers/favourites");

route.get("/get-favourites", isAuth, favouritesController.getFavourites);

module.exports = route;
