const mongoose = require("mongoose");

const mensCloth = mongoose.Schema({
  image: [{ type: String }],
  type: { type: String, required: true },
  companyName: { type: String, required: true },
  cardDescription: { type: String, required: true },
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
  gender: {
    type: String,
    enum: ["Men", "Women", "Kids"],
    required: true,
  },
  size: {
    type: String,
    enum: ["S", "M", "L", "XL", "XXL", "3XL"],
    required: true,
  },
  rating: { type: Number, required: true },
});

module.exports = mongoose.model("mensCloth", mensCloth);
