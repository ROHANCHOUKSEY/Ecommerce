const mongoose = require("mongoose");

const womensFootwear = mongoose.Schema({
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
    enum: ["6", "7", "8", "9", "10"],
  },
  rating: { type: String },
});

module.exports = mongoose.model("womensFootwear", womensFootwear);