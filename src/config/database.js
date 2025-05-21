require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("DB URI:", process.env.MONGODB_URI);
  await mongoose.connect(process.env.MONGODB_URI);
};

module.exports = connectDB;
