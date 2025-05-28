const express = require("express");
const authRouter = express.Router();
const User = require("../models/user")
const bcrypt = require("bcrypt");
const { validateSignupData } = require("../utils/validate");

// signup api
authRouter.post("/signup", async (req, res) => {
  try {
    //validate user data
    validateSignupData(req);
    const {
      firstName,
      lastName,
      email,
      password,
      age,
      gender,
      photoURL,
      skills,
      about,
    } = req.body;
    //encrypt user password
    const hashedPassword = await bcrypt.hash(password, 10);

    //creating a new instance of user
    const userObj = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,
      gender,
      photoURL,
      skills,
      about,
    });

    await userObj.save();
    res.send("user successfully created");
  } catch (err) {
    console.log(err);
    res.status(400).send("ERROR : " + err.message);
  }
});


//login api
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email: email});
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //create a JWT token
      const token = await user.getJWT();

      //Add the token to the cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 24 * 3600000),
      });
      res.send("login sucessfully");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//logout api
authRouter.post("/logout", async (req,res)=>{
    res.cookie("token", null, {
        expires:new Date(Date.now())
    })
    res.send("logout successfully");
})


module.exports = authRouter;