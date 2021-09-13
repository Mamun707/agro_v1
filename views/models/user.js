const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name:String,
    email: {
        type:String,
        unique:true
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    password:String
},{
    timestamps:true
});


module.exports=mongoose.model("user",userSchema)