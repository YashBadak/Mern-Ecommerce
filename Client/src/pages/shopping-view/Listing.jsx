import ProductFilter from '@/components/shopping-view/ProductFilter'
import ShoppingProductTile from '@/components/shopping-view/ShoppingProductTile'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { sortOptions } from '@/config'
import { fetchAllFilterdProducts, fetchProductDetails } from '@/store/Shop/product-slice'

import { ArrowUpDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import ProductDetailsDialog from './ProductDetailsDialog'
import { addToCart, fetchCartItems } from '@/store/Shop/cart-slice'
import { toast } from 'sonner'


function createSearchParamsHelper(filterParams){
  const queryParams=[];
  for(const[key,value] of Object.entries(filterParams)){
    if(Array.isArray(value) && value.length > 0){
      const paramValue= value.join(',')
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
    }
  }
  return queryParams.join("&");

}

function Listing() {
    const dispatch=useDispatch();
  const {productList, productDetails}=useSelector(state=>state.shopingProductSlice)
  const {cartItems}=useSelector(state=> state.shopCart)
  const {user}=useSelector(state=>state.auth)
 
  const [filter,setFilter]=useState({});
  const [sort,setSort]=useState(null);
  const [searchParams,setSearchParams]=useSearchParams()
  const [openDetailsDialog,setOpenDetailsDialog]=useState(false);
  
  const categorySearchParams=searchParams.get('category')

  function handleSort(value){
    setSort(value)
  }


function handleFilter(getSectionId,getCurrentOption){
  let cpyFilters= { ...filter };
  const indexOfCurrentSection=Object.keys(cpyFilters).indexOf(getSectionId);
  if(indexOfCurrentSection === -1){
    cpyFilters={
      ...cpyFilters,
      [getSectionId]: [getCurrentOption]
    };
  }else{
    const indexOfCurrentOption= cpyFilters[getSectionId].indexOf(getCurrentOption);
    if(indexOfCurrentOption === -1) cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1); 
  }
 setFilter(cpyFilters)
 sessionStorage.setItem('filter',JSON.stringify(cpyFilters));
}

function handleGetProductDetails(getCurrentProductId){
  dispatch(fetchProductDetails(getCurrentProductId))
}

 function handleAddTOCart(getCurrentProductId,getTotalStock){
  const getCartItems= cartItems.items || [];
  if(getCartItems.length){
    const indexOfCurrentItem= getCartItems.findIndex(item=> item.productId === getCurrentProductId);
    if(indexOfCurrentItem > -1){
     const getQuantity=getCartItems[indexOfCurrentItem].quantity;
     if(getQuantity + 1 > getTotalStock){
      toast(`only ${getQuantity} Quantity Can Be Added For This Item`)
      return;
     }
    }
  }
    dispatch(addToCart({userId:user?.id,productId: getCurrentProductId,quantity:1})).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchCartItems(user?.id))
        toast("Cart Added")
      }
    })

  }


useEffect(()=>{
  setSort('price-lowtohigh');
  setFilter(JSON.parse(sessionStorage.getItem('filter')) || {});
},[categorySearchParams])

useEffect(()=>{
  if(filter && Object.keys(filter).length > 0){
    const createQueryString= createSearchParamsHelper(filter);
    setSearchParams(new URLSearchParams(createQueryString))
  }

},[filter])
   

  useEffect(()=>{
    if(filter != null && sort != null)
    dispatch(fetchAllFilterdProducts({filterParams: filter,sortParams: sort}))
  },[dispatch,filter,sort])

  useEffect(()=>{
    if(productDetails !== null) setOpenDetailsDialog(true)

  },[productDetails])

  console.log(productList, 'productList')


  return (
    <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6'>
      <ProductFilter filter={filter} handleFilter={handleFilter}/>
      <div className='w-full bg-background rounded-lg shadow-sm'>
        <div className='p-4 border-b flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>All Products</h1>
          <div className='flex items-center gap-5'>
            <span className='text-muted-foreground'>{productList?.length} Products</span>
              <DropdownMenu>
            <DropdownMenuTrigger aschild>
              <Button variant='outline'>
                <ArrowUpDownIcon/>
                <h1>Sort By</h1>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                {
                  sortOptions.map(item=> <DropdownMenuRadioItem value={item.id} key={item.key}>{item.label}</DropdownMenuRadioItem>)
                }

              </DropdownMenuRadioGroup>

            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>
         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-4'>
  {productList && productList?.length > 0
    ? productList.map(product => (
        <div key={product._id} className="flex flex-col h-full">
          <ShoppingProductTile setOpen={setOpenDetailsDialog} handleAddTOCart={handleAddTOCart} handleGetProductDetails={handleGetProductDetails} product={product} />
        </div>
      ))
    : (
      <p className='col-span-full text-center'>No products found</p>
    )
  }
</div>
        </div>
        <ProductDetailsDialog productDetails={productDetails} open={openDetailsDialog} setOpen={setOpenDetailsDialog}/>
      
      </div>
  )
}

export default Listing