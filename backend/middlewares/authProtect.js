const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET;

const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    res.status(401).json({
      message: "Not authenticated. No token provided.",
    });
  }
  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Token verification failed.", error: err.message });
  }
  if (!decodedToken) {
    return res.status(401).json({ message: "Not authenticated." });
  }
  req.userId = decodedToken.userId;
  next();
};

module.exports = isAuth;
