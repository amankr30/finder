const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName,lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("name is required");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    );
  }
};

module.exports = {
  validateSignupData,
};
