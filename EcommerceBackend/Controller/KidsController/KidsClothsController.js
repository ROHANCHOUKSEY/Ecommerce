const kidClothModel = require("../../Model/KidsModel/KidCloth");

exports.kidsCloth = async (req, res) => {
  try {
    const {
      image,
      type,
      companyName,
      cardDescription,
      price,
      detailsDescription,
      color,
      category,
      size,
      rating,
    } = req.body;

    const newKidCloth = new kidClothModel({
      image, 
      type, 
      companyName,
      cardDescription,
      price,
      detailsDescription,
      color,
      category,
      size,
      rating,
    });

    await newKidCloth.save();
    res
      .status(200)
      .json({ success: true, message: "newKidCloth save successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: `newKidCloth successfully not save, ${error}`,
    });
  }
};

exports.getkidsCloth = async (req, res) => {
  try {
    const getkidsCloth = await kidClothModel.find(req.body);
    await res.status(200).json(getkidsCloth);
  } catch (error) {
    console.log("Not get kidCloth: ", error);
    await res
      .status(400)
      .json({ success: false, message: `Not get kidCloth ${error}`});
  }
};
