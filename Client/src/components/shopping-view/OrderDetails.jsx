import React from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'

function OrderDetails({orderDetails}) {
  const {user}=useSelector(state=> state.auth);
  return (
<DialogContent className='w-full sm:max-w-[600px] max-h-[90vh] overflow-y-auto'>
  <div className='grid gap-6'>
    <div className='grid gap-2'>
      <div className='flex flex-wrap items-center justify-between gap-1 mt-5'>
        <p className='font-medium'>Order ID</p>
        <Label className='break-all text-sm text-right'>{orderDetails?._id}</Label>
      </div>

      <div className='flex items-center justify-between mt-2'>
        <p className='font-medium'>Order Date</p>
        <Label>{orderDetails?.orderDate?.split('T')[0]}</Label>
      </div>

      <div className='flex items-center justify-between mt-2'>
        <p className='font-medium'>Order Price</p>
        <Label>${orderDetails?.totalAmount}</Label>
      </div>

      <div className='flex items-center justify-between mt-2'>
        <p className='font-medium'>Payment Method</p>
        <Label>{orderDetails?.paymentMethod}</Label>
      </div>

      <div className='flex items-center justify-between mt-2'>
        <p className='font-medium'>Payment Status</p>
        <Label>{orderDetails?.paymentStatus}</Label>
      </div>

      <div className='flex items-center justify-between mt-2'>
        <p className='font-medium'>Order Status</p>
        <Label>
          <Badge className={`${orderDetails?.orderStatus === 'confirmed' ? 'bg-green-700' : orderDetails?.orderStatus === 'rejected' ? 'bg-red-500' : 'bg-black'} px-3 py-1 text-sm`}>
            {orderDetails?.orderStatus}
          </Badge>
        </Label>
      </div>
    </div>

    <Separator />

    <div className='grid gap-4'>
  <div className='grid gap-2'>
    <div className='font-medium'>Order Details</div>

    <ul className='grid gap-2'>
      {orderDetails?.cartItems?.length > 0 ? (
        orderDetails.cartItems.map((item, index) => (
          <li
            key={index}
            className='flex justify-between items-center border rounded-md px-3 py-2'
          >
            <span className='font-medium'>{item?.title}</span>
            <span className='text-sm text-muted-foreground'>Qty: {item?.quantity}</span>
            <span className='font-semibold'>${item?.price}</span>
          </li>
        ))
      ) : (
        <li className='text-muted-foreground'>No items in this order.</li>
      )}
    </ul>
  </div>
</div>

    <Separator />

    <div className='grid gap-2'>
      <div className='font-medium'>Shipping Info</div>
      <div className='grid gap-0.5 text-muted-foreground text-sm'>
        <span>{user?.userName}</span>
        <span>{orderDetails?.addressInfo?.address}</span>
        <span>{orderDetails?.addressInfo?.pincode}</span>
        <span>{orderDetails?.addressInfo?.city}</span>
        <span>{orderDetails?.addressInfo?.phone}</span>
        <span>{orderDetails?.addressInfo?.notes}</span>
      </div>
    </div>
  </div>
</DialogContent>

  )
}

export default OrderDetails