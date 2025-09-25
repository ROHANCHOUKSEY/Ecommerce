const express = require("express");
const MenRouter = express.Router();

const MensClothRoutes = require("../../Controller/MensController/MensClothsController");
const MensFootwearRoutes = require("../../Controller/MensController/MensFootwearController");

MenRouter.post("/menscloths", MensClothRoutes.mensCloth);
MenRouter.get("/mens-cloths", MensClothRoutes.getmensCloth);
MenRouter.post("/mensfootwear", MensFootwearRoutes.mensFootwear);
MenRouter.get("/mens-footwear", MensFootwearRoutes.getMensFootWear);

module.exports = MenRouter;  