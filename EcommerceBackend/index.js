const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authRouter = require("./Router/AuthenticationRouter");

app.use(cookieParser());
app.use(express.json());

app.use("/user", authRouter);


mongoose.connect(process.env.DB_PATH).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
  });
}).catch((error) => {
    console.log("Database is not connected: ", error);  
}); 
          