require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const MONGO_DB_URI = process.env.MONGO_DB_URI;
const allowedOrigin = "http://localhost:3000";

const app = express();

const authRoutes = require("./routes/auth");
const favouritesRoutes = require("./routes/favourites");
const reviewRoutes = require("./routes/reviews");
const userRoutes = require("./routes/user");

app.use(bodyParser.json());
app.use(cookieParser());

const corsOptions = {
  origin: allowedOrigin,
  credentials: true,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use("/auth", authRoutes);
app.use("/favourites", favouritesRoutes);
app.use("/reviews", reviewRoutes);
app.use("/user", userRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(MONGO_DB_URI)
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
