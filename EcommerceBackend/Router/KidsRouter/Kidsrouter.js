const express = require("express");
const KidRouter = express.Router();

const KidsClothRoutes = require("../../Controller/KidsController/KidsClothsController");

KidRouter.post("/KidsCloths", KidsClothRoutes.kidsCloth);
KidRouter.get("/kids-cloth", KidsClothRoutes.getkidsCloth);

module.exports = KidRouter;
