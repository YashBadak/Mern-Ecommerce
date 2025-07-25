import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import OrderDetails from './OrderDetails'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersByUserId, getOrderDetails, resetOrderDetails } from '@/store/Shop/order-slice'
import { Badge } from '../ui/badge'

function ShoppingOrders() {
  const[openDetailsDialog,setOpenDetailsDialog]=useState(false);
  const dispatch=useDispatch();
  const {user}=useSelector(state=> state.auth);
  const {orderList,orderDetails}=useSelector(state=> state.shopOrder);

  function handleFetchOrderDetails(getId){
    dispatch(getOrderDetails(getId));

  }

  useEffect(()=>{
    dispatch(getAllOrdersByUserId(user?.id))
  },[dispatch]);

  useEffect(()=>{
    if(orderDetails !== null) setOpenDetailsDialog(true);
  },[orderDetails])

  console.log(orderDetails)
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className='sr-only'>Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              orderList && orderList.length > 0 ? orderList.map((orderItem)=>  <TableRow>
            <TableCell>{orderItem?._id}</TableCell>
            <TableCell>{orderItem?.orderDate.split('T')[0]}</TableCell>
            <TableCell><Badge className={`${orderItem?.orderStatus === 'confirmed' ? 'bg-green-700' : orderItem?.orderStatus === 'rejected' ? 'bg-red-500' : 'bg-black'} px-3 py-1 text-sm`}>{orderItem?.orderStatus}</Badge></TableCell>
            <TableCell>${orderItem?.totalAmount}</TableCell>
            <TableCell>
              <Dialog open={openDetailsDialog} onOpenChange={()=>{
                setOpenDetailsDialog(false);
                dispatch(resetOrderDetails());
              }}>
              <Button className='cursor-pointer' onClick={()=>handleFetchOrderDetails(orderItem?._id)}>View Details</Button>
              <OrderDetails orderDetails={orderDetails}/>
              </Dialog>
            </TableCell>
            </TableRow>) : null
            }
           
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default ShoppingOrders