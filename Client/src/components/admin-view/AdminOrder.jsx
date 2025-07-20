import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import AdminOrderDetails from './AdminOrderDetails'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails
} from '@/store/Admin/order-slice'
import { Badge } from '../ui/badge'

function AdminOrder() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState(null)
  const { orderList, orderDetails } = useSelector(state => state.adminOrder)
  const dispatch = useDispatch()

  function handleFetchOrderDetails(getId) {
    setSelectedOrderId(getId)
    dispatch(getOrderDetailsForAdmin(getId))
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin())
  }, [dispatch])

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true)
    }
  }, [orderDetails])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Order History</CardTitle>
      </CardHeader>
<CardContent>
  {/* Desktop / Laptop View: Table */}
  <div className="hidden lg:block overflow-x-auto w-full">
    <Table className="min-w-[700px] w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Order Date</TableHead>
          <TableHead>Order Status</TableHead>
          <TableHead>Order Price</TableHead>
          <TableHead>
            <span className="sr-only">Details</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderList?.length > 0 ? (
          orderList.map(orderItem => (
            <TableRow key={orderItem._id}>
              <TableCell>{orderItem._id}</TableCell>
              <TableCell>{orderItem.orderDate?.split('T')[0]}</TableCell>
              <TableCell>
                <Badge
                  className={`${
                    orderItem.orderStatus === 'confirmed'
                      ? 'bg-green-700'
                      : orderItem.orderStatus === 'rejected'
                      ? 'bg-red-500'
                      : 'bg-black'
                  } px-3 py-1 text-sm`}
                >
                  {orderItem.orderStatus}
                </Badge>
              </TableCell>
              <TableCell>${orderItem.totalAmount}</TableCell>
              <TableCell>
                <Button onClick={() => handleFetchOrderDetails(orderItem._id)}>
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5}>No orders found.</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>

  {/* Mobile / Tablet View: Cards */}
  <div className="flex flex-col gap-4 lg:hidden">
    {orderList?.length > 0 ? (
      orderList.map(orderItem => (
        <div
          key={orderItem._id}
          className="border rounded-xl p-4 bg-muted shadow-sm space-y-2"
        >
          <div className="text-sm">
            <span className="font-semibold">Order ID: </span>
            {orderItem._id}
          </div>

          <div className="text-sm">
            <span className="font-semibold">Order Date: </span>
            {orderItem.orderDate?.split('T')[0]}
          </div>

          <div className="text-sm flex items-center gap-2">
            <span className="font-semibold">Status: </span>
            <Badge
              className={`${
                orderItem.orderStatus === 'confirmed'
                  ? 'bg-green-700'
                  : orderItem.orderStatus === 'rejected'
                  ? 'bg-red-500'
                  : 'bg-black'
              } px-3 py-1 text-sm`}
            >
              {orderItem.orderStatus}
            </Badge>
          </div>

          <div className="text-sm">
            <span className="font-semibold">Total: </span>${orderItem.totalAmount}
          </div>

          <div>
            <Button size="sm" onClick={() => handleFetchOrderDetails(orderItem._id)}>
              View Details
            </Button>
          </div>
        </div>
      ))
    ) : (
      <div className="text-sm text-muted-foreground">No orders found.</div>
    )}
  </div>
</CardContent>


      <Dialog
        open={openDetailsDialog}
        onOpenChange={isOpen => {
          setOpenDetailsDialog(isOpen)
          if (!isOpen) dispatch(resetOrderDetails())
        }}
      >
        
        <AdminOrderDetails orderDetails={orderDetails} />
      </Dialog>
    </Card>
  )
}

export default AdminOrder
