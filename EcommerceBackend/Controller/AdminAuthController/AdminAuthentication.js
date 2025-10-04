const { validationResult, check } = require("express-validator");
const AdminModel = require("../../Model/AdminModel/Admin");
const transporter = require("../../Config/ConformationEmail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.AdminRegistration = [
  check("firstname")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 character long")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("First name can only contain letters"),

  check("lastname")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 character long")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("Last name can only contain letters"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  check("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 character long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[!@#$%^&*?<>:{}|<>]/)
    .withMessage("Password must contain at least one special letter"),

  check("confirm_password")
    .trim()
    .custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error("Password do not match");
      }
      return true;  
    }),

  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ success: false, errors: error.array() });
    }

    const { firstname, lastname, email, password, confirm_password } = req.body;

    const findUser = await AdminModel.findOne({ email });

    if (findUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already registered" });
    }

    bcrypt.hash(password, 12).then(async (hashpassword) => {
      const newAdmin = new AdminModel({
        firstname,
        lastname,
        email,
        password: hashpassword,
      });

      await newAdmin.save();

      const mailOption = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Welcome to Our E-commerce Platform!`,
        text: "Welcome Admin",
      };

      await transporter.sendMail(mailOption);

      const token = jwt.sign(
        { adminId: newAdmin._id },
        process.env.JWT_SECRETKEY,
        { expiresIn: "7d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        samesite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ message: "Admin Successfully registered" });
    });
  },
];

exports.sendVerifyotp = async (req, res) => {
  try {
    const adminId = req.adminId;

    const admin = await AdminModel.findById(adminId);

    console.log("adminId: ", adminId);

    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "admin not registered" });
    }

    if (admin.isAccountVerified) {
      return res
        .status(400)
        .json({ success: false, message: "admin is already varified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    const expireotp = Date.now() + 24 * 60 * 60 * 1000;

    admin.verifyOtp = otp;
    admin.verifiedOtpExpireAt = expireotp;

    await admin.save();

    const mailOption = {
      from: process.env.EMAIL_USER,
      to: admin.email,
      subject: `Your Email Verification OTP`,
      text: `admin email verification otp ${otp}`,
    };

    await transporter.sendMail(mailOption);

    await res.json({
      success: true,
      message: "successfully send admin email verify otp",
    });
  } catch (error) {
    console.log("otp is not send: ", error);
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const adminId = req.adminId;

    const admin = await AdminModel.findById(adminId);

    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "admin not found" });
    }

    if (admin.verifyOtp === "" && admin.verifyOtp !== otp) {
      return res
        .status(400)
        .json({ success: false, message: "otp is not verified" });
    }

    if (admin.verifiedOtpExpireAt < Date.now() + 2 * 60 * 1000) {
      return res.status(400).json({ success: false, message: "otp is expire" });
    }

    admin.isAccountVerified = true;
    admin.verifyOtp = "";
    admin.verifiedOtpExpireAt = "";

    await admin.save();
    res.json({ success: true, message: "otp verify successfully" });
  } catch (error) {
    console.log("otp is not verify: ", error);
  }
};

exports.AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await AdminModel.findOne({ email });

    if (!admin) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    const adminPassword = await bcrypt.compare(password, admin.password);

    if (!adminPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password" });
    }

    const token = jwt.sign(
      { adminId: admin._id, email: admin.email },
      process.env.JWT_SECRETKEY,
      { expiresIn: "7d" }
    );

    res.cookie("token", token);
    await res.status(200).json({ message: "User Login Successfully" }, token);
  } catch (error) {
    console.log("Admin is not login: ", error);
  }
};

exports.AdminForgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const admin = await AdminModel.findOne({ email });

    if (!admin) {
      res.status(400).json({ success: false, message: "Invalid Email" });
    }

    if (admin.email !== email) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    const resetotp = String(Math.floor(100000 + Math.random() * 900000));

    const resetotpExp = Date.now() + 24 * 60 * 60 * 1000;

    admin.resetotp = resetotp;

    admin.resetOtpExpireAt = resetotpExp;

    const mailOption = {
      from: process.env.EMAIL_USER,
      to: admin.email,
      subject: `Reset Your Password - OTP Inside`,
      text: `Admin Forget password ${resetotp}`,
    };

    await transporter.sendMail(mailOption);

    await admin.save();
    await res.json({ success: true, message: "Successfully send reset otp" });
  } catch (error) {
    console.log("not send otp for forget password", error);
  }
};

exports.verifyresetotp = async (req, res) => {
  try {
    const { email, resetotp } = req.body;

    const admin = await AdminModel.findOne({ email });

    if (!admin || admin.email !== email) {
      res.status(400).json({ success: false, message: "Invalid Email" });
    }

    if (admin.resetotp === "" || admin.resetotp !== resetotp) {
      res.status(400).json({ success: false, message: "Invalid Email" });
    }

    if (admin.resetOtpExpireAt < Date.now()) {
      return res
        .status(400)
        .json({ success: "false", message: "otp is expired" });
    }

    await admin.save();
    await res.json({ success: true, message: "reset otp is verified" });
  } catch (error) {
    console.log("forget password otp is not verify: ", error);
  }
};

exports.adminnewpassword = [
  check("newPassword")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 character long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[!@#$%^&*?<>:{}|<>]/)
    .withMessage("Password must contain at least one special letter"),

  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ success: false, message: error.array() });
    }

    const { email, newPassword } = req.body;

    const admin = await AdminModel.findOne({ email });

    if (!admin) {
      res.status(402).json({ success: false, message: "Invalid Email" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    admin.password = hashedPassword;
    admin.resetotp = "";
    admin.resetOtpExpireAt = 0;

    const mailOption = {
      from: process.env.EMAIL_USER,
      to: admin.email,
      subject: `Admin Password Has Been Successfully Changed`,
      text: `Admin ${admin.firstname} password is successfully changed`,
    };

    await transporter.sendMail(mailOption);
    await admin.save();

    res
      .status(200)
      .json({ success: true, message: "Admin Password Successfully Changed" });
  },
];
 
exports.AdminLogOut = async (req, res) => {
  try {
    res.clearCookie("token");
    res
      .status(200) 
      .json({ success: true, message: "Admin Successfully Logout" });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Admin not logout successfully" });
  }
};
