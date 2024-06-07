const express = require("express");
const route = express.Router();
const isAuth = require("../middlewares/authProtect");

const authController = require("../controllers/auth");

route.post("/login", authController.postLogin);

route.post("/signup", authController.postSignUp);

route.get("/user-info", authController.getUserInfo);

route.post("/logout", authController.postLogout);

route.post("/send-reset-email", authController.postSendResetEmail);

route.get("/reset/:token", authController.verifyResetPasswordToken);

route.get(
  "/reset/auth/:userId",
  isAuth,
  authController.verifyResetPasswordUserId
);

route.post("/reset/reset-password", authController.postChangePassword);

module.exports = route;
