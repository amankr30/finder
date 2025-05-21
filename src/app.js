const express = require("express");

const connectDB = require("./config/database");
const app = express();

const User = require("./models/user");

app.post("/signup", async (req, res) => {
  //creating a new instance of user
  const userObj = new User({
    firstName: "Abhay",
    lastName: "Kumar",
    email: "abhaykumarkushwaha123@gmail.com",
    password: "123456789",
  });

  try {
    await userObj.save();
    res.send("user successfully created");
  } catch (err) {
    console.log(err);
    res.status(400).send("Error creating user");
  }
});

connectDB()
  .then(() => {
    console.log("MongoDB connected");
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((err) => {
    console.log("MongoDB not connected");
  });
