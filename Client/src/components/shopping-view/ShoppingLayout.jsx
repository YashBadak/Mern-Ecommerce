import React from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingHeader from './ShoppingHeader'

function ShoppingLayout() {
  return (
    <div className='flex flex-col bg-gray-50 overflow-hidden'>
        {/* commen header */}
        <ShoppingHeader/>
        <main className='flex flex-col w-full'>
            <Outlet/>
        </main>

    </div>
  )
}

export default ShoppingLayout