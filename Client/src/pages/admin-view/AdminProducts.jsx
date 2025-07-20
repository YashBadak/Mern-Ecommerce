import AdminProductTile from '@/components/admin-view/AdminProductTile';
import ProductImageUpload from '@/components/admin-view/ProductImageUpload';
import CommonForm from '@/components/common/CommonForm';
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config';
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from '@/store/Admin/product';
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const initialFromData={
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: '',
}



function AdminProducts() {
  const [openCreateProductDialog,setOpenCreateProductDialog]=useState(false);
  const [formData,setFormData]=useState(initialFromData);
  const [imageFile,setImageFile]=useState(null);
  const [uploadImageUrl,setUploadImageUrl]=useState('');
  const [imageLoadingState,setImageLoadingState]=useState(false);
  const [currentEditedId,setCurrentEditedId]=useState(null)
  const {productList}=useSelector(state=>state.adminProducts)
  const dispatch=useDispatch();
  function onSubmit(event){
    event.preventDefault();
    currentEditedId !== null ? dispatch(editProduct({
      id: currentEditedId,
      formData
    })).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchAllProducts());
        setImageFile(null);
        setFormData(initialFromData);
        setCurrentEditedId(null);
        setOpenCreateProductDialog(false);
        toast("Product Edited Successfully")
      }
    }) :
    dispatch(addNewProduct({
      ...formData,
      image: uploadImageUrl
    })).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchAllProducts());
        setImageFile(null);
        setFormData(initialFromData);
        setOpenCreateProductDialog(false);
        toast("Product Added SuccessFully");
     
      }
    })
}

function isFormValid(){
  return Object.keys(formData).map(key=> formData[key] !== '').every(item=> item);
}

function handleRemoveFunction(getDeleteId){
  dispatch(deleteProduct(getDeleteId)).then((data)=>{
    if(data?.payload?.success){
      dispatch(fetchAllProducts());
      toast("Product Deleted")
    }
  })
}

useEffect(()=>{
dispatch(fetchAllProducts())
},[dispatch])
  return (
    <Fragment>
      <div className='mb-5 flex justify-end w-full'>
        <Button onClick={()=> setOpenCreateProductDialog(true)} className='cursor-pointer p-5 text-lg'>Add New Products</Button>
      </div>
      <div className='grid  gap-4 md:grid-cols-2 lg:grid-cols-4'>
        { productList && productList.length > 0 ?
        productList.map((productItem)=> <AdminProductTile handleRemoveFunction={handleRemoveFunction} setCurrentEditedId={setCurrentEditedId} setFormData={setFormData} setOpenCreateProductDialog={setOpenCreateProductDialog} product={productItem}/>) : null
}
      </div>
      <Sheet open={openCreateProductDialog} onOpenChange={()=>{
        setOpenCreateProductDialog(false);
        setCurrentEditedId(null);
       setFormData(initialFromData);
      }} className=' '>
        <SheetContent side='right' className='overflow-auto'>
          <SheetHeader>
            <SheetTitle>{currentEditedId !== null ? 'Edit Product' :'Add New Products'}</SheetTitle>
          </SheetHeader>
          <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} isEdited={currentEditedId} uploadImageUrl={uploadImageUrl}  setUploadImageUrl={setUploadImageUrl} imageLoadingState={imageLoadingState}  setImageLoadingState={setImageLoadingState}/>
          <div className='py-6 px-4'> 
            <CommonForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            buttonText={currentEditedId !== null ? "Edit" : "Add" }
            formControls={addProductFormElements}
            isBtnDisabled={!isFormValid()}
            />

          </div>

        </SheetContent>

      </Sheet >
      

    </Fragment>
  )
}

export default AdminProducts