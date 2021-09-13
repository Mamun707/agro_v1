const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const landSchema = new Schema({
    name:String,
    quantity: {
        type:String,
        unique:true
    },
    amount:String,
    startTime:Date,
    endDate:Date
},{
    timestamps:true
});


module.exports=mongoose.model("land",landSchema)