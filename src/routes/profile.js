const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validate");
const validator = require("validator");
const bcrypt = require("bcrypt");

// get profile api
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// update profile api
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName} Your profile updated successfully`,
      user: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// update password api
profileRouter.patch("/profile/forgotPassword", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { password, newPassword } = req.body;
    if (!password || !newPassword) {
      throw new Error("Old password and new password are required");
    }
    if (!validator.isStrongPassword(newPassword)) {
      throw new Error(
        "New password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
    }
    if (password === newPassword) {
      throw new Error("Old password and new password cannot be same");
    }
    const isPasswordValid = await loggedInUser.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Old password is incorrect");
    }
    const hashedPassword = await bcrypt.hash(newPassword,10);
    loggedInUser.password = hashedPassword;
    await loggedInUser.save();
    res.json({
      message: "Password updated successfully",
      user: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;
