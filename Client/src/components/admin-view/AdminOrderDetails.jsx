import React, { useState } from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import CommonForm from '../common/CommonForm'
import { Badge } from '../ui/badge'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from '@/store/Admin/order-slice'
import { toast } from 'sonner'

const initialFormData={
  status: ''
}

function AdminOrderDetails({orderDetails}) {
  const [formData,setFormData]=useState(initialFormData)
  const {user}=useSelector(state=> state.auth);
  const dispatch=useDispatch();

  function handleUpdateStatus(event){
    event.preventDefault();
    const {status}= formData;
    dispatch(updateOrderStatus({id: orderDetails?._id, orderStatus: status})).then((data)=>{
      if(data?.payload?.success){
        dispatch(getOrderDetailsForAdmin(orderDetails?._id))
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast(data?.payload?.message);
      }
    })
  }

  return (
   <DialogContent className="sm:max-w-[600px] px-6 py-6 rounded-lg max-h-[90vh] overflow-y-auto">

      <div className='grid gap-6'>
        <div className='grid gap-2'>
          <div className='flex mt-5 items-center justify-between'>
            <p className='font-medium'>Order ID</p>
            <Label>{orderDetails?._id}</Label>

          </div>
          <div className='flex mt-2 items-center justify-between'>
            <p className='font-medium'>Order Date</p>
            <Label>{orderDetails?.orderDate.split('T')[0]}</Label>

          </div>
          <div className='flex mt-2 items-center justify-between'>
            <p className='font-medium'>Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
           <div className='flex mt-2 items-center justify-between'>
                      <p className='font-medium'>Payment Method</p>
                      <Label>{orderDetails?.paymentMethod}</Label>
          
                    </div>
                    <div className='flex mt-2 items-center justify-between'>
                      <p className='font-medium'>Payment Status</p>
                      <Label>{orderDetails?.paymentStatus}</Label>
          
                    </div>
          <div className='flex mt-2 items-center justify-between'>
            <p className='font-medium'>Order Status</p>
            <Label><Badge className={`${orderDetails?.orderStatus === 'confirmed' ? 'bg-green-700' : orderDetails?.orderStatus === 'rejected' ? 'bg-red-500' : 'bg-black'} px-3 py-1 text-sm`}>{orderDetails?.orderStatus}</Badge></Label>

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

        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <div className='font-medium'>Shopping Info</div>
            <div className='grid gap-0.5 text-muted-foreground'>
              <span>UserId :- {orderDetails?.userId}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.phone} </span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>

        </div>
        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "inProcess", label: "In Process" },
                  { id: "in Shipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={'Update Order Status'}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>

    </DialogContent>
  )
}

export default AdminOrderDetails