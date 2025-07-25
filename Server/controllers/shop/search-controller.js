const productModel = require("../../models/productModel");

const searchProducts= async (req,res)=>{
    try {
        const {keyword}=req.params;
        if(!keyword || typeof keyword !== 'string'){
            return res.status(400).json({
                success:false,
                message:"Keyword Is Required And Must Be A String Format"
            })
        }
        const regEx= new RegExp(keyword, 'i')

        const createSearchQuery={
            $or :[
                {title : regEx},
                {description : regEx},
                {category : regEx},
                {brand : regEx},
            ]
        }

        const searchResults= await productModel.find(createSearchQuery);
        res.status(200).json({
            success:true,
            data: searchResults
        })
        
    }  catch (error) {
        console.log(error);
            return res.status(500).json({
                success: false,
                message: "Error"
            });
    }
}

module.exports= {searchProducts};