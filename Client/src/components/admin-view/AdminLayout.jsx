import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'

function AdminLayout() {
  const [openSidebar,setOpenSidebar]=useState(false);
  return (
    <div className='flex min-h-screen w-full'>
          <AdminSidebar open={openSidebar} setOpen={setOpenSidebar}/>
        <div className='flex flex-1 flex-col'>
          <AdminHeader open={openSidebar} setOpen={setOpenSidebar}/>
            <main className='flex-1 flex-col flex bg-muted/40 p-4 md:p-6'>
                <Outlet/>
            </main>


        </div>
    </div>
  )
}

export default AdminLayout