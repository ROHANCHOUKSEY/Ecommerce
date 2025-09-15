const express = require("express");
const AuthRouter = express.Router();

const userAuthentication = require("../Controller/Authentication/UserAuthentication");
const verifytoken = require("../Config/verifyToken");
const userAuth = require("../middleware/userAuth");

AuthRouter.post("/userRegistration", userAuthentication.UserRegistration);
AuthRouter.post("/userLogin", userAuthentication.userLogin);
AuthRouter.post("/sendotp", userAuth ,userAuthentication.sendVerifyOtp);
AuthRouter.post("/verifyOtp", userAuth, userAuthentication.verifyOtp) 
AuthRouter.post("/resetPassword", userAuthentication.userForgetPassword);
AuthRouter.post("/verifyResetOtp", userAuthentication.userForgetPasswordVerify);
AuthRouter.post("/newPassword", userAuthentication.userNewPassword);
AuthRouter.get("/profile", verifytoken, (req, res, next) => {
  res.json({ message: `Welcome back! Your email is ${req.user.email}` });
});


module.exports = AuthRouter;
