const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const transactionSchama = new Schema({
    title:String,
    category: {
        type:"String",
        enum:["fish","rice","animal","others"]
    },
    amount:Number,
    type:{
        type:"String",
        enum:["inward","outward"]
    },
    buyerName:String,
    buyerPhone:String
},{
    timestamps:true
});


module.exports=mongoose.model("transaction",transactionSchama)