const express = require("express");
const AdminRouter = express.Router();

const AdminRoutes = require("../../Controller/AdminAuthController/AdminAuthentication");
const AdminAuth = require("../../middleware/AdminAuth");

AdminRouter.post("/adminregistration", AdminRoutes.AdminRegistration);
AdminRouter.post("/admin_otpsent", AdminAuth, AdminRoutes.sendVerifyotp);
AdminRouter.post("/admin_otpverify", AdminAuth, AdminRoutes.verifyOtp );
AdminRouter.post("/adminlogin", AdminRoutes.AdminLogin);
AdminRouter.post("/admin_resetotpsent", AdminRoutes.AdminForgetPassword);
AdminRouter.post("/admin_resetotpverify", AdminRoutes.verifyresetotp);
AdminRouter.post("/admin_passwordchange", AdminRoutes.adminnewpassword);
AdminRouter.post("/adminLogout", AdminRoutes.AdminLogOut);
 
module.exports = AdminRouter;
 