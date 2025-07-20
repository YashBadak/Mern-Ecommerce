const productModel = require("../../models/productModel")

const getFilteredProduct=async(req,res)=>{
    try {

        const {category=[],brand=[], sortBy="price-lowtohigh"}=req.query;
        let filter={};
        if(category.length){
            filter.category= {$in: category.split(',')}

        }
        if(brand.length){
            filter.brand= {$in: brand.split(',')}

        }
        let sort={}
        switch (sortBy) {
            case 'price-lowtohigh':
                sort.price= 1
                break;
            case 'price-hightolow':
                sort.price= -1
                break;
            case 'title-atoz':
                sort.title= 1
                break;
            case 'title-ztoa':
                sort.title= -1
                break;
        
            default:
                sort.price=1
                break;
        }
        const product=await productModel.find(filter).sort(sort);
         res.json({
        success:true,
        data:product
    })
        
    } catch(err){
        res.status(500).json({
        success:false,
        message:"Some Error Occured"
    })
    }
}

const getProductDetails=async(req,res)=>{
    try{
    const{id}=req.params;
    const product=await productModel.findById(id);
    if(!product) return res.status(404).json({
            success:false,
            message:"product Not Available"
        })
    res.status(200).json({
        success: true,
        data: product,
    })
}catch(err){
      res.status(500).json({
        success:false,
        message:"some Error Occured"
    })
}
}

module.exports= {getFilteredProduct, getProductDetails};