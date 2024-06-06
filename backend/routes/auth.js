const express = require("express");
const route = express.Router();

const authController = require("../controllers/auth");

route.post("/login", authController.postLogin);

route.post("/signup", authController.postSignUp);

route.get("/user-info", authController.getUserInfo);

route.post("/logout", authController.postLogout);

module.exports = route;
