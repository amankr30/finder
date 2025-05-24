const express = require("express");

const connectDB = require("./config/database");
const app = express();
app.use(express.json());
const { validateSignupData } = require("./utils/validate");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const jwt = require("jsonwebtoken");

const User = require("./models/user");

//login api
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      //create a JWT token
      const token = await jwt.sign({ _id: user._id }, "QAZplm@12345");

      //Add the token to the cookie and send the response back to the user
      res.cookie("token", token);
      res.send("login sucessfully");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// get profile api
app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("No token provided");
    }

    //validate the token
    const decodedMessage = jwt.verify(token, "QAZplm@12345");
    const { _id } = decodedMessage;
    const user = await User.find({ _id });
    if (!user) {
      throw new Error("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

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

// signup api
app.post("/signup", async (req, res) => {
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
