const adminAuth = (req, res, next) => {
  console.log("user authentication for data is checked");
  const token = "xyz123";
  const authentication = token === "xyz123";
  if (!authentication) {
    return res.status(401).send("Unauthorized access");
  } else {
    next();
  }
};

const adminAuthDelete = (req, res, next) => {
  console.log("user authentication for deletion is checked");
  const token = "xyz123";
  const authentication = token === "xyz123";
  if (!authentication) {
    return res.status(401).send("Unauthorized access");
  } else {
    next();
  }
};

module.exports={
    adminAuth,
    adminAuthDelete,
}