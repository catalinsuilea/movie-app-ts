const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const JWT_SECRET_KEY = process.env.JWT_SECRET;
const NODEMAILER_KEY = process.env.NODEMAILER_KEY;
const EMAIL_SENDER = process.env.EMAIL_SENDER;

const nodeMailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodeMailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: NODEMAILER_KEY,
    },
  })
);

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

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      username: username,
      email: email,
      password: hashedPassword,
      resetPasswordToken: "",
      resetPasswordExpires: "",
      profile_picture: "",
      isPremiumUser: false,
      premiumToken: "",
      premiumPriceValue: 0,
      createdAt: Date.now(),
      favourites: [],
      reviews: [],
    });

    const userCreated = await user.save();

    // Send email only if user creation is successful
    await transporter.sendMail({
      to: email,
      from: EMAIL_SENDER,
      subject: "Signup succeeded!",
      html: "<h1>You successfully signed up!</h1>",
    });

    // Return the created user
    res.status(201).json({
      message: "User created successfully!",
      user: userCreated,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(422).json({ message: "User not found!" });
    }
    const doMatch = await bcrypt.compare(password, user.password);
    if (!doMatch) {
      return res.status(422).json({ message: "Invalid password!" });
    }

    const token = jwt.sign(
      {
        email: email,
        userId: user._id,
        username: user.username,
        profile_picture: user.profile_picture,
      },
      JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600 * 1000, // 1 hour
      sameSite: "None",
    });

    res.status(200).json({
      message: "Logged In",
    });
  } catch (err) {
    console.error("Error in postLogin:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.postLogout = (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while trying to logout. Try again later" });
  }
};

exports.getUserInfo = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized", token: token });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const user = await User.findOne({ _id: decoded.userId });
    return res
      .status(200)
      .json({ user: decoded, isPremiumUser: user.isPremiumUser });
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized", token: token });
  }
};

exports.postSendResetEmail = async (req, res, next) => {
  const email = req.body.email || {};
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const token = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = (Date.now() + 3600000).toString();

    await user.save();

    await transporter.sendMail(
      {
        from: EMAIL_SENDER,
        to: email,
        subject: "Password Reset",
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
    Please click on the following link, or paste this into your browser to complete the process:\n\n
    https://www.movie-pilot-app.xyz/reset/${token}\n\n
    If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      },
      (err, response) => {
        if (err) {
          return res.status(500).json({
            message: "There was an error sending your email. Please try again",
          });
        } else {
          return res
            .status(200)
            .json({ message: "Recovery email sent. Please check your email." });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Error resetting password" });
  }
};

exports.verifyResetPasswordToken = async (req, res, next) => {
  const token = req.params.token || {};
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Password reset token is invalid or has expired" });
    }

    res.status(200).json({ message: "Token is valid", isValid: true });
  } catch (err) {
    res.status(500).json({ message: "Error verifying token" });
  }
};

exports.verifyResetPasswordUserId = async (req, res, next) => {
  const userId = req.params.userId || {};
  try {
    const user = await User.findOne({
      _id: userId.toString(),
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User is valid", isValid: true });
  } catch (err) {
    res.status(500).json({ message: "Error verifying user" });
  }
};

exports.postChangePassword = async (req, res, next) => {
  const { password, token, userId } = req.body;

  try {
    let user;
    if (token) {
      user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Password reset token is invalid or has expired" });
      }
      user.resetPasswordToken = "";
      user.resetPasswordExpires = "";
    } else {
      user = await User.findOne({
        _id: userId,
      });
      if (!user) {
        return res.status(400).json({ message: "User not found." });
      }
    }
    user.password = await bcrypt.hash(password, 12);

    await user.save();

    res.status(200).json({ message: "Password has been updated" });
  } catch (err) {
    return res.status(500).json({ message: "Error updating password" });
  }
};
