const express = require("express");
const ImgUploadRouter = express.Router();

const ImgUpload = require("../Controller/ImageUploadController/ImageUpload");


ImgUploadRouter.post("/imgupload", ImgUpload.uploadImg);

module.exports = ImgUploadRouter; 