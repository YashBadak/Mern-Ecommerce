const mongoose=require("mongoose");

const featureSchema=new mongoose.Schema({
    image: String
},{timestamps: true})

const featureModel=mongoose.model("feature",featureSchema);

module.exports=featureModel