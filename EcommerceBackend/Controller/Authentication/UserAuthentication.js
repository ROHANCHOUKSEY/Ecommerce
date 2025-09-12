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
      return res.status(400).json({ ValidationError: error.array() });
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

      const mailOption = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Welcome to our ecommerce website`,
        text: `Welcome to the website ${email}`,
      };

      await transporter.sendMail(mailOption);

      console.log("Email send");

      await newUser.save();
      res.status(200).json({ message: "User successfully registered" });
    });
  },
];

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  const findUser = await userModel.findOne({ email });

  if (!findUser) {
    return res.status(400).json({ message: "Email not found" });
  }

  const verifyPassword = await bcrypt.compare(password, findUser.password);

  console.log("verifyPassword: ", verifyPassword);

  if (!verifyPassword) {
    return res.status(400).json({ message: "Invalid Password" });
  }

  const token = jwt.sign(
    { userID: findUser._id, email: findUser.email, isLoggined: true },
    process.env.JWT_SECRETKEY,
    { expiresIn: "7d" }
  );

  res.cookie("token", token);
  await res.status(200).json({ message: "User login successfully" }, token);
};
