const mongoose=require('mongoose');

const orderSchema=new mongoose.Schema({
    userId: String,
    cartId: String,
    cartItems:[
        {
        productId: String,
        title: String,
        image: String,
        price: String,
        quantity: Number,
    },
],
    addressInfo:{
        addressId: String,
        address: String,
        city: String,
        pincode: String,
        phone: String,
        notes: String,
    },
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: Number,
    orderDate: Date,
    orderUpdateDate: Date,
    paymentId: String,
    payerId: String
})

const orderModel=mongoose.model("Order",orderSchema);
module.exports=orderModel;