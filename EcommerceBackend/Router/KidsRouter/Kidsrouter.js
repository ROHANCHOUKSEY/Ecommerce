const express = require("express");
const KidRouter = express.Router();

const KidsClothRoutes = require("../../Controller/KidsController/KidsClothsController");
const KidsFootwearRoutes = require("../../Controller/KidsController/KidsFootwearController");

KidRouter.post("/Kidscloths", KidsClothRoutes.kidsCloth);
KidRouter.get("/kids-cloths", KidsClothRoutes.getkidsCloth);
KidRouter.post("/kidsfootwear", KidsFootwearRoutes.kidsFootwear);
KidRouter.get("/kids-footwear", KidsFootwearRoutes.getkidsFootWear);

module.exports = KidRouter;
