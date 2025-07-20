const { imageUploadUtill } = require("../../../helper/config");
const productModel = require("../../../models/productModel");

const handleImageUpload=async(req,res)=>{
try {
    const b64= Buffer.from(req.file.buffer).toString('base64');
    const url='data:'+ req.file.mimetype + ';base64,' + b64;
    const result=await imageUploadUtill(url);
    res.json({
        success:true,
        result
    })
    
} catch (error) {
    console.log(error);
    res.json({
        success:false,
        message:"Error Occured"
    })
    
}
}

//Add New Product

const addProduct=async(req,res)=>{
    try {
         const {image,title,description,category,brand,price,salePrice,totalStock}=req.body;
         const newCratedProduct=new productModel({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock
         })
         await newCratedProduct.save();
         res.status(200).json({
            success:true,
            data:newCratedProduct,
         })
    } catch (error) {
           console.log(error);
    res.json({
        success:false,
        message:"Error Occured"
    })
    }
}


//Fetch New Product
const fetchAllProduct=async(req,res)=>{
    try{
    const listOfProducts=await productModel.find({});
    res.json({
        success:true,
        data:listOfProducts
    })
}catch (error) {
           console.log(error);
    res.json({
        success:false,
        message:"Error Occured"
    })
    }

}

//Update New Product

const editProduct=async(req,res)=>{
    try{
    const {id}=req.params;
    const {image,title,description,category,brand,price,salePrice,totalStock}=req.body;
    let findProduct=await productModel.findById(id);
    if(!findProduct)
        return res.json({
            success:false,
            message:'Product Not Found'
        });

    findProduct.title=title || findProduct.title
    findProduct.description=description || findProduct.description
    findProduct.category=category || findProduct.category
    findProduct.brand=brand || findProduct.brand
    findProduct.price=price === '' ? 0 : price || findProduct.price
    findProduct.salePrice=salePrice === '' ? 0 :salePrice || findProduct.salePrice
    findProduct.totalStock=totalStock || findProduct.totalStock
    findProduct.image=image || findProduct.image

    await findProduct.save();
    res.json({
        success:true,
        data:findProduct
    })

    
}catch (error) {
           console.log(error);
    res.json({
        success:false,
        message:"Error Occured"
    })
    }

}


//Delete New Product

const deleteProduct=async(req,res)=>{
    try{
    const {id}=req.params;
    const product=await productModel.findByIdAndDelete(id);
    if(!product)
        return res.json({
            success:false,
            message:'Product Not Found'
        });

        res.status(200).json({
        success:true,
        message: 'Product Deleted SuccessFully'
    })


}catch (error) {
           console.log(error);
    res.json({
        success:false,
        message:"Error Occured"
    })
    }

}


module.exports= {handleImageUpload, addProduct, fetchAllProduct,editProduct,deleteProduct};