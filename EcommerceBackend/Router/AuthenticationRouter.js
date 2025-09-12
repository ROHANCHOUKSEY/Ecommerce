const express = require("express");
const AuthRouter = express.Router();

const userAuthentication = require("../Controller/Authentication/UserAuthentication");
const verifytoken = require("../Config/verifyToken");

AuthRouter.post("/userRegistration", userAuthentication.UserRegistration);
AuthRouter.post("/userLogin", userAuthentication.userLogin);
AuthRouter.get("/profile", verifytoken, (req, res, next) => {
  res.json({ message: `Welcome back! Your email is ${req.user.email}` });
});

module.exports = AuthRouter;
