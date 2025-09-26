const womenFootwearModel = require("../../Model/WomensModel/WomensFootwear");

exports.womensFootwear = async (req, res) => {
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

    const newWomensFootwear = new womenFootwearModel({
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

    await newWomensFootwear.save();

    res
      .status(200)
      .json({ success: true, message: "newWomensFootwear save successfully" });
  } catch (error) {
    console.log("newWomenFootwear not save successfully: ", error);
    res.status(400).json({
      success: false,
      message: "newWomenFootwear not save successfully",
    });
  }
};

exports.getWomensFootwear = async (req, res) => {
  try {
    const getWomensFootwear = await womenFootwearModel.find(req.body);
    res.status(200).json(getWomensFootwear);
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Not get WomensFootwear Successfully" });
  }
};
