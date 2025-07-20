const express=require("express");
const { upload } = require("../../helper/config");
const { handleImageUpload, addProduct, fetchAllProduct, editProduct, deleteProduct } = require("../../controllers/auth/admin/product-controller");
const router=express.Router();
router.post("/upload-image", upload.single('my_file'),handleImageUpload)
router.post("/add",addProduct)
router.get("/get",fetchAllProduct)
router.put("/edit/:id",editProduct)
router.delete("/delete/:id",deleteProduct)

module.exports=router;

