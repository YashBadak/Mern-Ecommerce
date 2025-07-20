import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import ShoppingCartContent from './ShoppingCartContent'
import { useNavigate } from 'react-router-dom'

function ShoppingCartWrapper({cartItems,setOpenCartSheet}) {
    const navigate=useNavigate();
    const totalCartAmount= cartItems && cartItems.length > 0 ? cartItems.reduce((sum,currentItem)=>sum + (
        currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price

    )* currentItem?.quantity,0) : 0
  return (
    <SheetContent className='sm:max-w-md'>
        <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className='mt-8 space-y-4'>
            {
                cartItems && cartItems.length > 0 ? cartItems.map(item=> <ShoppingCartContent cartItem={item}/>)  : null
            }

        </div>
        <div className='mt-8 space-y-4 px-4'>
            <div className='flex text-xl font-bold justify-between'>
                <span>Total</span>
                <span>${totalCartAmount}</span>
            </div>
        </div>
        <div className='px-4 mt-5'>
            <Button onClick={()=> {
                navigate("/shop/checkout")
                setOpenCartSheet(false);
                }} className='w-full p-7 '>CheckOut</Button>
        </div>
    </SheetContent>
  )
}

export default ShoppingCartWrapper