const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const authRouter = require("./Router/AuthenticationRouter");
const KidRouter = require("./Router/KidsRouter/Kidsrouter");
const MenRouter = require("./Router/MensRouter/Mensrouter");
const WomenRouter = require("./Router/WomensRouter/Womensrouter");
const ImgUploadRouter = require("./Router/ImageuploadRouter");
const AdminRouter = require("./Router/AdminRouter/Adminrouter");

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["POST", "GET", "DELETE", "PUT"],
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
}); 

const upload = multer({storage});

app.use("/user", authRouter);
app.use("/kidsCollection", KidRouter);
app.use("/MensCollection", MenRouter);
app.use("/WomensCollection", WomenRouter);
app.use("/admin", AdminRouter);
app.use(ImgUploadRouter);

mongoose
  .connect(process.env.DB_PATH)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database is not connected: ", error);
  });
 