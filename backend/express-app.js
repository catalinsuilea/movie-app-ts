const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const authRoutes = require("./routes/auth");

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use("/auth", authRoutes);

mongoose
  .connect(
    "mongodb+srv://ctnjoy1999:5D6RgwesZUIWfsj4@cluster0.sqj9cam.mongodb.net/movies-app-db?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
