const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, email, password } = req.body;
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

const validateEditProfileData = (req, res) => {
  try {
    const userData = req.body;
    const ALLOWED_PROFILE_EDIT = [
      "firstName",
      "lastName",
      "age",
      "photoURL",
      "skills",
      "about",
    ];
    const isAllowedProfileEdit = Object.keys(userData).every((key) =>
      ALLOWED_PROFILE_EDIT.includes(key)
    );
    if (!isAllowedProfileEdit) {
      throw new Error("Invalid update fields");
    }

    if (
      userData.skills &&
      Array.isArray(userData.skills) &&
      userData.skills.length > 10
    ) {
      throw new Error("Skills should be less than or equal to 10");
    }

    if (userData.photoURL && !validator.isURL(userData.photoURL)) {
      throw new Error("Invalid photo URL");
    }

    if (userData.about && userData.about.length > 200) {
      throw new Error(
        "About section should be less than or equal to 200 characters"
      );
    }
    return isAllowedProfileEdit;
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

module.exports = {
  validateSignupData,
  validateEditProfileData,
};
