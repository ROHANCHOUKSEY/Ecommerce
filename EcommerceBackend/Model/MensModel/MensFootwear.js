const mongoose = require("mongoose");

const mensFootwear = mongoose.Schema({
  img: [{ type: String }],
  type: { type: String },
  companyName: { type: String },
  cardDescription: { type: String },
  detailsDescription: { type: String },
  gender: { 
    type: String, 
    enum: ["Men", "Women", "Kids"], 
    required: true 
  },
  size: {
    type: String,
    enum: ["6", "7", "8", "9", "10", "11", "12"],
  },
  rating: { type: String },
});

module.exports = mongoose.model("mensFootwear", mensFootwear);