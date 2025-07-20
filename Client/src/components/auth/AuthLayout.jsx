import React from 'react'
import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <div className='flex flex-col lg:flex-row min-h-screen w-full'>

      {/* Left Banner - hidden on small screens */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#5c3b22] via-[#7e4710] to-[#a48355] items-center justify-center text-white px-6 py-10">
        <div className="bg-[#5c3b22]/60 p-6 sm:p-10 rounded-2xl max-w-md space-y-4 text-left">
          <h1 className="text-3xl sm:text-4xl font-bold">New Season Essentials</h1>
          <p className="text-base sm:text-lg leading-relaxed">
            🌟 Premium Craftsmanship<br />
            🧥 Timeless Neutrals<br />
            🛒 Shop the Collection
          </p>
        </div>
      </div>

      {/* Right Section (form/outlet) */}
      <div className='flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-10'>
        <Outlet />
      </div>
      
    </div>
  )
}

export default AuthLayout
