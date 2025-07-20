import React from 'react'
import accImg from '../../assets/account.jpg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Accounts from '@/components/shopping-view/Accounts'
import ShoppingOrders from '@/components/shopping-view/ShoppingOrders'

function Account() {
  return (
    <div className='flex flex-col'>
      <div className='relative h-[300px] w-full overflow-hidden'>
        <img src={accImg} className='h-full w-full object-cover object-center' />

      </div>
      <div className='container mx-auto grid grid-cols-1 gap-8 py-8'>
        <div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm'>
          <Tabs defaultValue='orders'>
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">address</TabsTrigger>
            </TabsList>
            <TabsContent value='orders'>
              <ShoppingOrders/>
            </TabsContent>
            <TabsContent value='address'>
              <Accounts/>

            </TabsContent>

          </Tabs>
        </div>

      </div>
    </div>
  )
}

export default Account