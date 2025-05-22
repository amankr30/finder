const express = require("express");

const connectDB = require("./config/database");
const app = express();
app.use(express.json());

const User = require("./models/user");

//update user data by ID
app.patch("/user", async (req, res) => {
  const userId = req.body.id;
  const userData = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, userData);
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

app.post("/signup", async (req, res) => {
  //creating a new instance of user
  const userObj = new User(req.body);

  try {
    await userObj.save();
    res.send("user successfully created");
  } catch (err) {
    console.log(err);
    res.status(400).send("Error creating user" + err.message);
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
