const mongoose = require("mongoose");

const kideCloth = mongoose.Schema({
  image: [{ type: String }],
  type: { type: String, required: true },
  companyName: { type: String, required: true },
  cardDescription: { type: String, required: true },
  detailsDescription: { type: String, required: true },
  gender: { 
    type: String, 
    enum: ["Men", "Women", "Kids"], 
    required: true 
  },
  size: {
    type: string,
    enum: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "9-10Y", "11-12Y"],
    required: true,
  },
  rating: { type: Number, required: true },
});


module.exports = mongoose.model("kideCloth", kideCloth);
