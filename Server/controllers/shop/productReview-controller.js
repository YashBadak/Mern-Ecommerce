const orderModel = require('../../models/orderModel');
const productModel = require('../../models/productModel');
const reviewModel = require('../../models/reviewModel');
const addProductReview = async (req, res) => {
    try {
        const {productId, userId, userName, reviewMessage, reviewValue } = req.body;

        const order = await orderModel.findOne({
            userId,
            "cartItems.productId": productId,
            orderStatus: "confirmed"
        })
        if (!order) {
            return res.status(403).json({
                success: false,
                message: "You Need To Purchase Product To Review It"
            })
        }

        const checkExistingReview = await reviewModel.findOne({productId, userId});
        if (checkExistingReview) {
            return res.status(400).json({
                success: false,
                message: "You Already Reviewed This Product"
            })
        }

        const newReview= new reviewModel({
             productId, userId, userName, reviewMessage, reviewValue
        })
        await newReview.save()
        const reviews=await reviewModel.find({productId});
        const totalReviewsLength=reviews.length;
        const averageReview=reviews.reduce((sum,reviewItem)=>sum+reviewItem.reviewValue,0)/totalReviewsLength;
        await productModel.findByIdAndUpdate(productId,{averageReview});
        res.status(200).json({
            success:true,
            data:newReview
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error"
        })

    }
}
const getProductReviews = async (req, res) => {
    try {
        const{productId}=req.params;
        const reviews=await reviewModel.find({productId});
        res.status(200).json({
            success:true,
            data: reviews,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error"
        })

    }
}

module.exports = { addProductReview, getProductReviews };