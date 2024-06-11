const express = require("express");

const route = express.Router();

const userController = require("../controllers/user");

const isAuth = require("../middlewares/authProtect");

route.get("/reviews/fetchAll/:id", isAuth, userController.getUserReviews);

route.get("/fetchUser/:id", isAuth, userController.getUser);

route.post("/upload", isAuth, userController.postUpload);

route.post("/delete-user", isAuth, userController.postDeleteUser);

route.post("/buy-premium", isAuth, userController.postBuyPremium);

route.get(
  "/check-payment-status/:premiumToken",
  isAuth,
  userController.checkPaymentStatus
);

route.post("/cancel-premium", isAuth, userController.cancelPremium);

module.exports = route;
