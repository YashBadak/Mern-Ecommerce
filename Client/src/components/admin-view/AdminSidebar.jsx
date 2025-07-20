import { BadgeCheck, ChartNoAxesCombined, LayoutDashboard, ShoppingBasket } from 'lucide-react'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

const adminSidebarMenueItems=[
  {
    id:"dashboard",
    label:"Dashboard",
    path:"/admin/dashboard",
    icon: <LayoutDashboard />
  },
  {
    id:"product",
    label:"Product",
    path:"/admin/products",
    icon: <ShoppingBasket/>
  },
  {
    id:"orders",
    label:"Orders",
    path:"/admin/orders",
    icon: <BadgeCheck />
  }
]

function MenuItems({setOpen}){
   const navigate=useNavigate();
  return <nav className='mt-10 flex-col flex gap-5 text-xl'>
    {adminSidebarMenueItems.map(MenuItems=> <div key={MenuItems.id} onClick={()=> {
      navigate(MenuItems.path)
      setOpen ? setOpen(false) : null;
      }} className='flex cursor-pointer items-center  gap-2 rounded-md px-3 py-2'>
      {MenuItems.icon}
      <span>{MenuItems.label}</span>

    </div>)}

  </nav>
}

function AdminSidebar({open, setOpen}) {
  const navigate=useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side='left' className='w-64'>
          <div className='flex flex-col h-full'>
            <SheetHeader className=' border-b '>
              <SheetTitle className='flex gap-2 items-center text-lg'>
                 <ChartNoAxesCombined  className='w-7 h-7'/>
                <span>Admin Panel</span>
                </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen}/>

          </div>

        </SheetContent>

      </Sheet>
      <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
        <div onClick={()=> navigate('/admin/dashboard')} className='flex cursor-pointer items-center gap-2 font-bold text-2xl'>
          <ChartNoAxesCombined  className='w-7 h-7'/>
          <h1>Admin Panel</h1>

        </div>
        <MenuItems/>

      </aside>

    </Fragment>
  )
}

export default AdminSidebar