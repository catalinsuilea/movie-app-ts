const express = require("express");
const route = express.Router();

const authController = require("../controllers/auth");

route.post("/login", authController.postLogin);

route.post("/signup", authController.postSignUp);

module.exports = route;
