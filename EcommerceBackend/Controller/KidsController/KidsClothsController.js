const kidCloths = require("../../Model/KidsModel/KidCloth");

exports.kidsCloth = async (req, res) => {
  try {
    const {
      // image,
      type,
      companyName,
      cardDescription,
      detailsDescription,
      gender,
      size,
      rating,
    } = req.body;

    const newKidCloth = new kidCloths({
      // image, 
      type, 
      companyName,
      cardDescription,
      detailsDescription,
      gender,
      size,
      rating,
    });

    await newKidCloth.save();
    res
      .status(200)
      .json({ success: true, message: "newKidsCloth successfully save" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: `newKidsCloth successfully not save, ${error}`,
    });
  }
};

exports.getkidsCloth = async (req, res) => {
  try {
    const getkidsCloth = await kidCloths.find(req.body);
    await res.status(200).json(getkidsCloth);
  } catch (error) {
    console.log("Not get kidsCloth: ", error);
    await res
      .status(400)
      .json({ success: false, message: `Not get kidsCloth ${error}`});
  }
};
