const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName:{type:String,required:true},
    email:{type:String,required:true,enum:true},
    password:{type:String,required:true}
})
