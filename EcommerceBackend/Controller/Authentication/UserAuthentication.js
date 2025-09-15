const { check, validationResult } = require("express-validator");
const userModel = require("../../Model/UserAuthenticationMode");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../../Config/ConformationEmail");

exports.UserRegistration = [
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
      return res.status(400).json({ error: error.array() });
    }

    const { firstname, lastname, email, password, confirm_password } = req.body;
    const findEmail = await userModel.findOne({ email });

    if (findEmail) {
      return res.status(400).json({ message: "user is already registered" });
    }

    bcrypt.hash(password, 12).then(async (hashpassword) => {
      const newUser = new userModel({
        firstname,
        lastname,
        email,
        password: hashpassword,
      });

      await newUser.save();

      const mailOption = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Welcome to Our E-commerce Platform!`,
        text: `Hi ${firstname},\n\nThank you for registering with us. We're excited to have you onboard.\n\nHappy shopping!\n\nRegards,\nTeam Ecommerce`,
      };

      await transporter.sendMail(mailOption);

      const token = jwt.sign(
        { userID: newUser._id },
        process.env.JWT_SECRETKEY,
        { expiresIn: "7d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        samesite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ message: "User successfully registered" });
    });
  },
];

exports.sendVerifyOtp = async (req, res) => {
  const userID = req.userID; //take userID from token

  const user = await userModel.findById(userID);

  if (!user) {
    return res.json({ success: "false", message: "user not found" });
  }

  if (user.isAccountVerified === true) {
    return res.json({ success: "false", message: "user already verifed" });
  }

  const otp = String(Math.floor(100000 + Math.random() * 900000));

  const expireOtp = Date.now() + 24 * 60 * 60 * 1000;

  user.verifyOtp = otp;
  user.verifiedOtpExpireAt = expireOtp;

  await user.save();

  const mailOption = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: `Your Email Verification OTP`,
    text: `Hello ${user.firstname},\n\nYour One-Time Password (OTP) to verify your email is:\n\n${otp}\n\nThis OTP is valid for 24 hours.\n\nIf you did not request this, please ignore this email.\n\nRegards,\nTeam Ecommerce`,
  };

  await transporter.sendMail(mailOption);

  await res.json({
    success: true,
    message: "successfully sent verified otp",
  });
};

exports.verifyOtp = async (req, res) => {
  console.log("Request body:", req.body); // Should print: { otp: "123456" }
  const userID = req.userID;
  const { otp } = req.body;

  console.log("otp: ", otp);

  const user = await userModel.findById(userID);

  if (!user) {
    return res
      .status(400)
      .json({ success: "false", message: "user not found" });
  }

  if (user.verifyOtp === "" || user.verifyOtp !== otp) {
    return res.status(400).json({ success: "false", message: "Invalid Otp" });
  }

  if (user.verifiedOtpExpireAt < Date.now() + 2 * 60 * 1000) {
    return res.status(400).json({ success: "false", message: "otp is expire" });
  }

  user.isAccountVerified = true;
  user.verifiedOtpExpireAt = "";

  await user.save();
  await res.json({ success: "true", message: "otp verify successfully" });
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  const findUser = await userModel.findOne({ email });

  if (!findUser) {
    return res
      .status(400)
      .json({ success: "false", message: "email not registered" });
  }

  const verifyPassword = await bcrypt.compare(password, findUser.password);

  console.log("verifyPassword: ", verifyPassword);

  if (!verifyPassword) {
    return res
      .status(400)
      .json({ success: "false", message: "Invalid Password" });
  }

  const token = jwt.sign(
    { userID: findUser._id, email: findUser.email, isLoggined: true },
    process.env.JWT_SECRETKEY,
    { expiresIn: "7d" }
  );

  res.cookie("token", token);
  await res.status(200).json({ message: "User login successfully" }, token);
};

exports.userForgetPassword = async (req, res) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res
      .status(404)
      .json({ success: "false", message: "Email not registered" });
  }

  if (user.email !== email) {
    return res
      .status(400)
      .json({ success: "false", message: "email do not match" });
  }

  const resetotp = String(Math.floor(100000 + Math.random() * 900000));

  const resetotpExp = Date.now() + 24 * 60 * 60 * 1000;

  user.resetOtp = resetotp;

  user.resetOtpExpireAt = resetotpExp;

  const mailOption = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: `Reset Your Password - OTP Inside`,
    text: `Hello ${user.firstname},\n\nYou requested a password reset. Please use the following OTP to reset your password:\n\n${resetotp}\n\nThis OTP is valid for 24 hours.\n\nIf you did not request a password reset, please ignore this email.\n\nRegards,\nTeam Ecommerce`,
  };

  await transporter.sendMail(mailOption);

  await user.save();
  await res.json({ success: "true", message: "Successfully send reset otp" });
};

exports.userForgetPasswordVerify = async (req, res) => {
  const { email, resetotp } = req.body;

  const user = await userModel.findOne({ email });

  if (!user || user.email !== email) {
    return res
      .status(402)
      .json({ success: "false", message: "user not found" });
  }

  if (user.resetOtp === "" || user.resetOtp !== resetotp) {
    return res
      .status(400)
      .json({ success: "false", message: "resetotp is not verified" });
  }

  if (user.resetOtpExpireAt < Date.now()) {
    return res
      .status(400)
      .json({ success: "false", message: "reset otp is now expired" });
  }
  
  await user.save();
  await res.json({
    success: "true",
    message: "ResetOtp Verified",
  });

};

exports.userNewPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await userModel.findOne(email);

  if (!user) {
    res.status(402).json({ success: "false", message: "User not found" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  user.password = hashedPassword;
  user.resetOtpExpireAt = 0;

  const mailOption = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: `Your Password Has Been Successfully Changed`,
    text: `Hello ${
      user.firstname
    },\n\nThis is a confirmation that your account password has been successfully changed on ${new Date().toLocaleString()}.\n\nThank you for using our E-commerce platform!\n\nRegards,\nTeam Ecommerce`,
  };

  await transporter.sendMail(mailOption);

  await user.save();

  await res
    .json(200)
    .json({ success: true, message: "Successfully Reset Password" });
};
