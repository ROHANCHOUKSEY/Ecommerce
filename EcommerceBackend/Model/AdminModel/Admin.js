const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirm_password: { type: String },
  isAccountVerified:{type:Boolean},
  verifyOtp:{type:String, default:''},
  verifiedOtpExpireAt:{type:String, default:0},
  resetotp:{type:String, default:''},
  resetOtpExpireAt:{type:String, default:0},
  products: [
    {
      category: {
        type: String,
        required: true,
        enum: [
          "KidCloth",
          "KidsFootwear",
          "Menscloth",
          "MensFootwear",
          "Womenscloth",
          "WomensFootwear",
        ],
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "products.category",
      },
    },
  ],
});

module.exports = mongoose.model("Admin", AdminSchema);
