const addressModel = require("../../models/addressModel");


const addAddress=async(req,res)=>{
    try {
        const {userId,address,city,pincode,phone,notes}=req.body;
        if(!userId || !address || !city || !pincode || !phone || !notes){
            return res.status(400).json({
                success:false,
                message:"Invalid Data Provided"
            })
        }

          


        const newlyCreatedAddress= new addressModel({
            userId,address,city,pincode,phone,notes
        })

        await newlyCreatedAddress.save();
        res.status(200).json({
            success:true,
            data: newlyCreatedAddress
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error"
        })
        
    }
}
const fetchAllAddress=async(req,res)=>{
    try {
        const {userId}=req.params;
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"UserId is Required"
            })
        }

        const addressList=await addressModel.find({userId})
        res.status(200).json({
            success:true,
            data: addressList
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error"
        })
    }
}
const editAddress=async(req,res)=>{
    try {
        const {userId,addressId}=req.params;
        const formData=req.body;
         if(!userId || !addressId){
            return res.status(400).json({
                success:false,
                message:"UserId And AddressId is Required"
            })
        }

        const address =await addressModel.findOneAndUpdate({_id: addressId, userId},formData,{new:true});
        if(!address){
            return res.status(404).json({
                success:false,
                message:"Address Not Found"
            })
        }

        res.status(200).json({
            success:true,
            data: address
        })



        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error"
        })
        
    }
}
const deleteAddress=async(req,res)=>{
    try {
        const { userId,addressId }=req.params;
        if(!userId || !addressId){
            return res.status(400).json({
                success:false,
                message:"UserId And AddressId is Required"
            })
        }

        const address=await addressModel.findOneAndDelete({_id: addressId, userId});

          if(!address){
            return res.status(404).json({
                success:false,
                message:"Address Not Found"
            })
        }

         res.status(200).json({
            success:true,
            message: "Address Deleted SuccessFully"
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error"
        })
        
    }
}

module.exports={addAddress, fetchAllAddress, editAddress,deleteAddress};