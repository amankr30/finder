const mongoose = require("mongoose");
const validator=require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 30,
    uppercase: true,
  },
  lastName: {
    type: String,
    trim: true,
    maxLength: 30,
    uppercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email format"+ value);
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  age: {
    type: Number,
    min: 18,
    trim: true,
  },
  gender: {
    type: String,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!["male", "female", "other"].includes(value)) {
        throw new Error("Invalid gender");
      }
    },
  },
  photoURL: {
    type: String,
    default:
      "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png",
  },
  phoneNumber: {
    type: String,
    minLength: 10,
    trim: true,
  },
  skills: {
    type: [String],
  },
  about: {
    type: String,
    default: "This is a default information about the user",
    maxLength: 500,
    trim: true,
  },
},{timestamps:true});

const User = mongoose.model("User", userSchema);
// moudule.exports=mongoose.model("User",userSchema);
module.exports = User;
