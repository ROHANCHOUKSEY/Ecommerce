const menClothModel = require("../../Model/MensModel/Menscloth");

exports.mensCloth = async (req, res) => {
  try {
    const {
      image,
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

    const newMensCloth = new menClothModel({
      image,
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

    await newMensCloth.save();

    res.status(200).json({success:true, message:"MenCloth Save Successfully"});

  } catch (error) {
    console.log("MenCloth Not Save Successfully", error);
    res.status(400).json({success:false, message:"MenCloth Not Save Successfully"})
  }
};


exports.getmensCloth = async(req, res) => {
    try{
        const getmensCloth = await menClothModel(req.body);
        res.status(200).json(getmensCloth);
    }catch(error){
        console.log("Not get mencloth successfully", error);
        res.status(400).json({success:false, message:"Not get mencloth successfully"});
    }
} 