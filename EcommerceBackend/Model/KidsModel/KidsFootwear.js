const mongoose = require("mongoose");

const kidsFootwear = mongoose.Schema({
  img: [{ type: String }],
  type: { type: String },
  companyName: { type: String },
  cardDescription: { type: String },
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
  gender: {
    type: String,
    enum: ["Men", "Women", "Kids"],
    required: true,
  },
  size: {
    type: String,
    enum: ["1-2Y", "2-2.5Y", "3-3.5Y", "4-4.5Y", "5-6Y", "7-8Y", "8-9Y"],
  },
  rating: { type: String },
});

module.exports = mongoose.model("kidsFootwear", kidsFootwear);
