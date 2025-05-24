const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    //read the token form the req cookie
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("No token provided");
    }

    //validate the token
    const decodeObj = jwt.verify(token, "QAZplm@12345");
    const { _id } = decodeObj;

    //find the user by ID
    const user = await User.findOne({ _id });
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

module.exports = {
  userAuth,
};
