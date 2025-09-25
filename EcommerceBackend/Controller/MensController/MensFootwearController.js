const menFootwearModel = require("../../Model/MensModel/MensFootwear");

exports.mensFootwear = async (req, res) => {
  try {
    const {
      img,
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

    const newMensFootwear = new menFootwearModel({
      img,
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

    await newMensFootwear.save();

    res.status(200).json({success:true, message:"newMenFootwear save successfully"});

  } catch (error) {
    console.log("newMenFootwear not save successfully: ", error);
    res.status(400).json({success:false, message:"newMenFootwear not save successfully"})
  }
};


exports.getMensFootWear = async (req, res) => {
    try{
     const getMensFootWear = await menFootwearModel.find(req.body);
     res.status(200).json(getMensFootWear);
    }catch(error){
        res.status(400).json({success:false, message: "Not get menFootWear Successfully"})
    }
}