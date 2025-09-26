const mongoose = require("mongoose");

const womensFootwear = mongoose.Schema({
  img: [{ type: String }],
  type: { type: String },
  companyName: { type: String },
  product_name: { type: String },
  price: { type: Number, require: true },
  detailsDescription: { type: String },
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
  size: {
    type: String,
    enum: ["6", "7", "8", "9", "10"],
  },
  rating: { type: String },
});

module.exports = mongoose.model("womensFootwear", womensFootwear);
