import React, { useState } from 'react'
import img from '../../assets/account.jpg'
import Accounts from '@/components/shopping-view/Accounts'
import { useDispatch, useSelector } from 'react-redux'
import ShoppingCartContent from '@/components/shopping-view/ShoppingCartContent';
import { Button } from '@/components/ui/button';
import { createNewOrder } from '@/store/Shop/order-slice';
import { toast } from 'sonner';

function CheckOut() {
  const { cartItems } = useSelector(state => state.shopCart);
  const { approvalURL }=useSelector(state=> state.shopOrder);
  const { user } = useSelector(state => state.auth);
  const [currentSelectedAddress,setCurrentSelectedAddress]=useState(null);
  const [isPaymentStart,setIsPaymentStart]=useState(false);
  const dispatch=useDispatch();
  console.log(currentSelectedAddress)

   const totalCartAmount = cartItems.items && cartItems.items && cartItems.items.length > 0 ? cartItems.items.reduce((sum, currentItem) => sum + (
    currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price

  ) * currentItem?.quantity, 0) : 0

  function handleInitiatePaypalPayment() {
    if(cartItems.length === 0){
      toast("Cart Is Empty");
      return;
    }
    
    if(currentSelectedAddress === null){
      toast("Please Select Address");
      return;
    }
    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map(singleCartItem => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price: singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo :{
         addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus:'pending',
      paymentMethod:'paypal',
      paymentStatus:'pending',
      totalAmount:totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: '',
      payerId: '',
    };
    dispatch(createNewOrder(orderData)).then((data)=>{
      console.log(data);
      if(data?.payload?.success){
        setIsPaymentStart(true);
      }else{
        setIsPaymentStart(false);
      }
    })

  }
  if(approvalURL){
    window.location.href= approvalURL;
  }

  return (
  <div className='flex flex-col'>
  
    <div className='relative h-[250px] md:h-[300px] w-full overflow-hidden'>
      <img
        src={img}
        className='w-full h-full object-cover object-center'
        alt='Checkout Banner'
      />
    </div>

  
    <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 mt-5 px-4 md:px-6 lg:px-10'>
      

      <Accounts
        currentSelectedAddress={currentSelectedAddress}
        setCurrentSelectedAddress={setCurrentSelectedAddress}
      />

      <div className='flex flex-col gap-4'>
        {
          cartItems?.items?.length > 0 &&
          cartItems.items.map((item, idx) => (
            <ShoppingCartContent key={idx} cartItem={item} />
          ))
        }

        <div className='mt-6 px-2 sm:px-4'>
          <div className='flex justify-between text-lg md:text-xl font-bold'>
            <span>Total</span>
            <span>${totalCartAmount}</span>
          </div>
        </div>
        <div className='mt-4 px-2  sm:px-4'>
          <Button
            onClick={handleInitiatePaypalPayment}
            className='w-full py-5  text-md'
          >
            {isPaymentStart ? "Processing Paypal Payment..." : "Checkout Paypal"}
          </Button>
        </div>
      </div>
    </div>
  </div>
)

}

export default CheckOut