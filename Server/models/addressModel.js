const mongoose=require("mongoose");

const AddressSchema=new mongoose.Schema({
    userId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String
},{timestamps:true})

const addressModel=mongoose.model("Address",AddressSchema);

module.exports=addressModel;