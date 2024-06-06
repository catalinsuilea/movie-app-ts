const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = process.env.JWT_SECRET;

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("User not found");
      return res.status(422).json({ message: "User not found!" });
    }
    const doMatch = await bcrypt.compare(password, user.password);
    if (!doMatch) {
      console.log("Invalid Password");
      return res.status(422).json({ message: "Invalid password!" });
    }

    const token = jwt.sign(
      {
        email: email,
        userId: user._id,
        username: user.username,
      },
      JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600 * 1000, // 1 hour
      sameSite: "Strict",
    });

    res.status(200).json({
      message: "Logged In",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postLogout = (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while trying to logout. Try again later" });
  }
};

exports.getUserInfo = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    return res.status(200).json({ user: decoded });
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

exports.postSignUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const isNotUniqueUsername = await User.find({ username: username });

    if (isNotUniqueUsername.length > 0) {
      const error = new Error("Username already taken.");
      error.statusCode = 422;
      throw error;
    }

    const isNotUniqueEmail = await User.find({ email: email });
    if (isNotUniqueEmail.length > 0) {
      const error = new Error("Email already taken.");
      error.statusCode = 422;
      throw error;
    }
    const criptedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      username: username,
      email: email,
      password: criptedPassword,
      favourites: [],
      reviews: [],
    });
    const userCreated = await user.save();
    if (userCreated) {
      res.status(201).json({
        message: "User created successfully!",
        user: userCreated,
      });
    } else {
      throw new Error(res.status);
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
