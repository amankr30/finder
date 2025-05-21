const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://amankunalbharti2001:fiQ20QueZeihSN7I@learnnode.7hhay.mongodb.net/finder"
  );
};

module.exports = connectDB;
