require("dotenv").config();
const express=require('express');
const mongoose=require("mongoose");
const cors=require("cors");
const cookieParser=require("cookie-parser");
const authRouter=require("./routers/auth/authRoute.js")
const adminProducts=require('./routers/admin/productRoutes.js')
const adminOrderRouter=require('./routers/admin/orderRoutes.js')
const shopProduct=require('./routers/shop/productsRoutes.js')
const shopCartRouter=require('./routers/shop/cartRoutes.js')
const shopAddressRouter=require("./routers/shop/addressRoutes.js")
const shopOrderRouter=require("./routers/shop/orderRoutes.js")
const shopSearchRouter=require("./routers/shop/searchRoutes.js")
const shopReviewRouter=require("./routers/shop/reviewRoutes.js")
const commonFeatureRouter=require("./routers/common/featureRoutes.js")
const app=express();
const PORT= process.env.PORT || 3000;


mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("mongoose Connected"))
.catch((err)=>console.log(err))


app.use(cors({
    origin: process.env.CLIENT_BASE_URL,
    methods:['GET','POST','DELETE','PUT'],
    allowedHeaders:[
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "pragma"
    ],
    credentials:true
}))
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRouter);
app.use('/api/admin/products',adminProducts);
app.use('/api/admin/orders',adminOrderRouter);
app.use('/api/shop/products',shopProduct);
app.use('/api/shop/cart',shopCartRouter);
app.use('/api/shop/address',shopAddressRouter);
app.use('/api/shop/order',shopOrderRouter);
app.use('/api/shop/search',shopSearchRouter);
app.use('/api/shop/review',shopReviewRouter);
app.use('/api/common/feature',commonFeatureRouter);

app.listen(PORT,()=>console.log(`Server Is Running On Port  ${PORT}`));