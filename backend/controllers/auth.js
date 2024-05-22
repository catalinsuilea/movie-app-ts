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
      },
      JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
    const expirationDate = new Date(decodedToken.exp * 1000);

    res.status(200).json({
      message: "User found",
      user: {
        username: user.username,
        token: token,
        tokenExpirationDate: expirationDate,
        userId: user._id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.postSignUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const criptedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      username: username,
      email: email,
      password: criptedPassword,
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
    console.log(err);
    res.status(500).json({
      message: "An error occured while creating the user:",
      err,
    });
  }
};
