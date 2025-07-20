import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { GiClothes } from "react-icons/gi";
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { CircleUser, LogOut, Menu, ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { shoppingViewHeaderMenuItems } from '@/config';

import { Avatar, AvatarFallback } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { logoutUser } from '@/store/AuthSlice';
import { toast } from 'sonner';
import ShoppingCartWrapper from './ShoppingCartWrapper';
import { fetchCartItems } from '@/store/Shop/cart-slice';
import { Label } from '../ui/label';



function MenuItems(){
  const navigate=useNavigate();
  const location=useLocation();
  const [searchParams, setSearchParams]=useSearchParams();
  function handleNavigate(getCurrentMenueItem){
    console.log(getCurrentMenueItem); // add this temporarily

    sessionStorage.removeItem('filter');
    const currentFilter= getCurrentMenueItem.id !=='home' &&  getCurrentMenueItem.id !== "products" && getCurrentMenueItem.id !== 'search'  ?
    {
      category:[getCurrentMenueItem.id]
    } : null
    sessionStorage.setItem("filter", JSON.stringify(currentFilter));
    location.pathname.includes('listing') && currentFilter !== null ? setSearchParams(new URLSearchParams(`?category=${getCurrentMenueItem.id}`)) :
    navigate(getCurrentMenueItem.path);

  }
  return<nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row '>
    {
      shoppingViewHeaderMenuItems.map((item)=><Label onClick={()=> handleNavigate(item)} className='text-md font-semibold cursor-pointer' key={item.id}    >{item.label}</Label>)
    }


  </nav>
}

    function HeaderRightContent({user}){
      const dispatch=useDispatch();
      const navigate=useNavigate();
      const [openCartSheet,setOpenCartSheet]=useState(false);
       const {cartItems }=useSelector(state=>state.shopCart)

      function logoutHandler(){
        dispatch(logoutUser())
        toast("Logout SuccessFully")
      }
      useEffect(()=>{
        dispatch(fetchCartItems(user?.id))

      },[dispatch])
      return <div className='flex lg:items-center lg:flex-row flex-col gap-4'>
        <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
  <Button onClick={() => setOpenCartSheet(true)} className='relative h-10 w-10' variant='outline' size='icon'>
    <ShoppingCart className='w-5 h-5' />
    <span className='absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full'>
      {cartItems?.items?.length || 0}
    </span>
    <span className='sr-only'>User Cart</span>
  </Button>
  <ShoppingCartWrapper
    setOpenCartSheet={setOpenCartSheet}
    cartItems={cartItems?.items?.length > 0 ? cartItems.items : []}
  />
</Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className='bg-black'>
              <AvatarFallback className='bg-black text-white'>
                {user?.userName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>


          </DropdownMenuTrigger>
          <DropdownMenuContent side='right' className='w-56'>
            <DropdownMenuLabel className='p-2'>Logged In as {user?.userName} </DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuItem onClick={()=> navigate('/shop/account')} className='cursor-pointer' >
              <CircleUser className='' />
              <span className='pl-2'>Accounts</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logoutHandler} className='cursor-pointer' >
              <LogOut  className='w-10 h-10'/>
              <span className='pl-2'>LogOut</span>
            </DropdownMenuItem>

          </DropdownMenuContent>

        </DropdownMenu>
         </div>
    }


function ShoppingHeader() {
  const {isAuthenticated, user}=useSelector(state=>state.auth)
  return (
   <header className='sticky top-0 z-40   w-full border-b bg-[#FDFDFD]'>
    <div className='flex h-16 items-center justify-between px-4 md:px-6'>
      <Link to='/shop/home' className='flex  items-center gap-2'>
      <GiClothes className='w-7 h-7' />
      <span className='text-2xl font-bold'>Clothy</span>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='lg:hidden'>
            <Menu className='w-6 h-6'/>
            <span className='sr-only' >Toggle Header Menue</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='w-full p-5 max-w-xs'>
          <MenuItems/>
          <HeaderRightContent user={user}/>
        </SheetContent>
      </Sheet>
      <div className='hidden lg:block'>
        <MenuItems/>
      </div>
       <div className='hidden lg:block'>
          <HeaderRightContent user={user}/>
        </div> 
    </div>
   </header>
  )
}

export default ShoppingHeader