const mongoose = require("mongoose");

const kidClothSchema = mongoose.Schema({
  image: [{ type: String }],
  type: { type: String, required: true },
  companyName: { type: String, required: true },
  product_name: { type: String, required: true },
  price: { type: Number, require: true },
  detailsDescription: { type: String, required: true },
  color: {
    type: String,
    enum: [
      "Black",
      "White",
      "Gray",
      "Navy",
      "Blue",
      "Sky Blue",
      "Red",
      "Maroon",
      "Pink",
      "Purple",
      "Green",
      "Olive",
      "Yellow",
      "Orange",
      "Brown",
      "Beige",
      "Cream",
      "Khaki",
      "Gold",
      "Silver",
    ],
    // required: true,
  },
  product_category: {
    type: String, 
    enum: ["Men", "Women", "Kids"],
    required: true,
  },
  sub_category:{
    type: String,
    enum: ["Topwear", "Bottomwear", "Winterwear"]
  },
  size: {
    type: String,
    enum: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "9-10Y", "11-12Y"],
    required: true,
  },
  rating: { type: Number, required: true },
});

module.exports = mongoose.model("kidCloths", kidClothSchema);
