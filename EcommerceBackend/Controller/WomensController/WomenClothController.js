const womenClothModel = require("../../Model/WomensModel/Womenscloth");

exports.womensCloth = async (req, res) => {
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

    const newWomensCloth = new womenClothModel({
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

    await newWomensCloth.save();
    res
      .status(200)
      .json({ success: true, message: "WomenCloth Save Successfully" });
  } catch (error) {
    console.log("WomenCloth Not Save Successfully: ", error);
    res
      .status(400)
      .json({ success: false, message: "WomenCloth Not Save Successfully" });
  }
};

exports.getwomensCloth = async (req, res) => {
  try {
    const getwomensCloth = await womenClothModel(req.body);
    res.status(200).json(getwomensCloth);
  } catch (error) {
    console.log("Not get womencloth successfully", error);
    res
      .status(400)
      .json({ success: false, message: "Not get womencloth successfully"});
  }
};
