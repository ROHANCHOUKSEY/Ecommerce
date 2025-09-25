const express = require("express");
const WomenRouter = express.Router();

const WomensClothRoutes = require("../../Controller/WomensController/WomenClothController");
const WomensFootwearRoutes = require("../../Controller/WomensController/WomensFootwearController");

WomenRouter.post("/womenscloths", WomensClothRoutes.womensCloth);
WomenRouter.get("/womens-cloths", WomensClothRoutes.getwomensCloth);
WomenRouter.post("/womensfootwear", WomensFootwearRoutes.womensFootwear);
WomenRouter.get("/womens-footwear", WomensFootwearRoutes.getWomensFootwear);


module.exports = WomenRouter; 