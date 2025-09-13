const mongoose = require("mongoose");

const userModels = mongoose.Schema({
    firstname:{type:String},
    lastname:{type:String},
    email:{type:String},
    verifyOtp:{type:String, default:''},
    verifiedOtpExpireAt:{type:Number, default:0},
    isAccountVerified:{type:Boolean, default:false},
    resetOtp:{type:String, default:''},
    resetOtpExpireAt:{type:String, default:''},
    password:{type:String},
    confirm_password:{type:String}
})

module.exports = mongoose.model("userModel", userModels);

 