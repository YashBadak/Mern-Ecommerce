import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { brandOptionsMap, categoryOptionsMap } from '@/config';

function ShoppingProductTile({ product, handleGetProductDetails,setOpen,handleAddTOCart }) {
  return (
    <Card className="w-full  max-w-sm mx-auto rounded-lg overflow-hidden p-0">
      <div onClick={()=>{
        handleGetProductDetails(product?._id)
        setOpen(true)
        }} className='cursor-pointer'>
      <div className="relative w-full h-[300px]">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-full object-cover object-top   "
        />
        {
          product?.totalStock === 0 ?  <Badge className="absolute top-2 left-2  bg-red-500">Out Of Stock</Badge> : 
          product?.totalStock < 10 ?  <Badge className="absolute top-2 left-2  bg-red-500">{`Only ${product?.totalStock} Items Left`}</Badge> :
        product?.salePrice > 0 && (
          <Badge className="absolute top-2 left-2  bg-red-500">sale</Badge>
        )}
      </div>

      <CardContent className="p-4">
        <h2 className="text-2xl font-bold mb-1">{product?.title}</h2>
         <div className="flex items-center justify-between mb-5">
          <span className="text-md text-gray-500 font-medium">{categoryOptionsMap[product?.category]}</span>
          <span className=' text-gray-500 text-md font-medium'>
            {brandOptionsMap[product?.brand]}
          </span>
        </div>
        <div className="flex justify-between items-center mb-2">
           
            {product?.salePrice > 0 ? (
              <span className="text-xl font-bold text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
             <span
              className={`${
                product?.salePrice > 0 ? "line-through text-gray-400  " : ""
              }  font-bold text-xl `}
            >
              ${product?.price}
            </span>
          </div>
      </CardContent>
      </div>
      <CardFooter className="px-4 pb-4 pt-0">
        {
          product?.totalStock === 0 ? <Button className="w-full  p-6 cursor-not-allowed opacity-60">Out Of Stock</Button> : <Button onClick={()=>handleAddTOCart(product?._id,product?.totalStock)} className="w-full p-6 ">Add To Card</Button>
        }
        
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
