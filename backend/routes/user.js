const express = require("express");

const route = express.Router();

const userController = require("../controllers/user");

const isAuth = require("../middlewares/authProtect");

route.get("/reviews/fetchAll/:id", isAuth, userController.getUserReviews);

route.get("/fetchUser/:id", isAuth, userController.getUser);

route.post("/upload", isAuth, userController.postUpload);

module.exports = route;
