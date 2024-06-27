require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");

const MONGO_DB_URI =
  process.env.MONGO_DB_URI || "mongodb://mongo:27017/movie-app-db";

const allowedOrigin = process.env.FRONTEND_DEPLOYED_URL;
console.log("hey", allowedOrigin, process.env.JWT_SECRET);

const authRoutes = require("./routes/auth");
const favouritesRoutes = require("./routes/favourites");
const reviewRoutes = require("./routes/reviews");
const userRoutes = require("./routes/user");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

const fileStorage = multer.diskStorage({
  destination: (req, filename, cb) => {
    cb(null, "images");
  },
  filename: (req, filename, cb) => {
    cb(null, `${new Date().getTime()}-${filename.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  }
  cb(null, false);
};

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

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

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
    console.log("Connected");
    console.log("hey", allowedOrigin);
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
