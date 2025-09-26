const kidFootwearModel = require("../../Model/KidsModel/KidsFootwear");

exports.kidsFootwear = async (req, res) => {
  try {
    const {
      img,
      type,
      companyName,
      product_name,
      price,
      detailsDescription,
      color,
      category,
      size,
      rating,
    } = req.body;

    const newKidsFootwear = new kidFootwearModel({
      img,
      type,
      companyName,
      product_name,
      price,
      detailsDescription,
      color,
      category,
      size,
      rating,
    });

    await newKidsFootwear.save();

    res
      .status(200)
      .json({ success: true, message: "newKidsFootwear save successfully" });
  } catch (error) {
    console.log("newKidFootwear not save: ", error);

    res.status(400).json({
      success: false,
      message: "newKidFootwear not save successfully",
    });
  }
};

exports.getkidsFootWear = async (req, res) => {
  try {
    const getkidsFootWear = await kidsFootwearModel.find(req.body);
    res.status(200).json(getkidsFootWear);
  } catch (error) {
    console.log("Not ger kidFootWear: ", error);
    res
      .status(400)
      .json({ success: false, message: "Not get kidFootWear Successfully" });
  }
};
