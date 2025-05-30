const express = require("express");
const connectDB = require("./config/database");
const app = express();
app.use(express.json());
const { validateSignupData } = require("./utils/validate");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const User = require("./models/user");
const { userAuth } = require("./middlewares/auth");

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);




//update user data by ID
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const userData = req.body;
  try {
    const ALLOWED_UPDATES = [
      "age",
      "photoURL",
      "phoneNumber",
      "skills",
      "about",
    ];
    const isUpdateAllowed = Object.keys(userData).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );
    if (!isUpdateAllowed) {
      throw new Error("Invalid update fields");
    }
    if (userData?.skills.length > 15) {
      throw new Error("Skills should be less than 15");
    }
    const user = await User.findByIdAndUpdate(userId, userData, {
      runValidators: true,
    });
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Error updating user" + err.message);
  }
});

// deleting user data by ID
app.delete("/user", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.body.id);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send("User deleted successfully");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Error getting user" + err.message);
  }
});

// getting user data by ID
app.post("/id", async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    if (user.length === 0) {
      return res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Error getting user" + err.message);
  }
});

// getting user data by email and ID
app.get("/user/:id", async (req, res) => {
  try {
    // const user = await User.find({ email: req.body.email });
    const user = await User.findById(req.params.id);
    if (user.length === 0) {
      return res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Error getting user" + err.message);
  }
});

// feed api - GET /feed - get all the user data
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("No users found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Error getting users" + err.message);
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
    console.log("MongoDB not connected" + err.message);
  });
