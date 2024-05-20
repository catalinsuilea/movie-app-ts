const User = require("../models/user");
const bcrypt = require("bcrypt");

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
    res.status(200).json({
      message: "User found",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
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
