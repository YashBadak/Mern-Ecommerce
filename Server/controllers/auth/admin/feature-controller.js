const featureModel = require("../../../models/feature");

const addFeatureImage= async(req,res)=>{
    try{
    const {image}=req.body;

    const featureImages=new  featureModel({
        image
    })
    await featureImages.save();
      res.status(200).json({
            success: true,
            data: featureImages
        })
}catch(error){
     console.log(error);
        res.status(500).json({
            success: false,
            message: "Some Error Occured"

        })
}

}
const getFeatureImage= async(req,res)=>{
    try{
        const images=await featureModel.find({});
          res.status(200).json({
            success: true,
           data: images

        })

}catch(error){
     console.log(error);
        res.status(500).json({
            success: false,
            message: "Some Error Occured"

        })
}

}
const deleteFeatureImage= async(req,res)=>{
    try{
        const {id}=req.params;
        const images=await featureModel.findByIdAndDelete(id);
          res.status(200).json({
            success: true,
           data: images

        })

}catch(error){
     console.log(error);
        res.status(500).json({
            success: false,
            message: "Some Error Occured"

        })
}

}


module.exports={addFeatureImage,getFeatureImage,deleteFeatureImage};