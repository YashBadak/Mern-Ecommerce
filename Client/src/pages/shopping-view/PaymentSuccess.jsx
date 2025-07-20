import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function PaymentSuccess() {
  const navigate=useNavigate();
  return (
  <Card className='w-full h-screen'>
      <CardHeader className=' w-full   mt-[5%] text-3xl font-bold'>
        <CardContent>
        <div className="flex flex-col items-center mt-10 justify-center text-green-600">
      <CheckCircle2 className="w-20 h-20 mb-2" />
      <p className="text-3xl font-semibold">Payment Successful</p>
    </div>
    <div className='flex flex-col items-center mt-10'>
      <Button onClick={()=> navigate("/shop/account")} className='p-5 py-5 cursor-pointer'>View Orders</Button>
    </div>
    </CardContent>
      </CardHeader>
    </Card>
  )
}

export default PaymentSuccess