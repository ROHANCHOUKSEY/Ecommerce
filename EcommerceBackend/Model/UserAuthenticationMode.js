const mongoose = require("mongoose");

const userModels = mongoose.Schema({
    firstname:{type:String},
    lastname:{type:String},
    email:{type:String},
    password:{type:String},
    confirm_password:{type:String}
})

module.exports = mongoose.model("userModel", userModels);

 