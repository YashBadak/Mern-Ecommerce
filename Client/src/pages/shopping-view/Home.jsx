import React, { useEffect, useState } from 'react'
import image1 from '../../assets/banner-1.webp'
import image2 from '../../assets/banner-2.webp'
import image3 from '../../assets/banner-3.webp'
import { Button } from '@/components/ui/button'
import { Airplay, BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, Heater, Images, Shirt, ShirtIcon, ShoppingBasket, UmbrellaIcon, WashingMachine, WatchIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilterdProducts, fetchProductDetails } from '@/store/Shop/product-slice'
import ShoppingProductTile from '@/components/shopping-view/ShoppingProductTile'
import { useNavigate } from 'react-router-dom'
import { addToCart, fetchCartItems } from '@/store/Shop/cart-slice'
import { toast } from 'sonner'
import ProductDetailsDialog from './ProductDetailsDialog'
import { getFeatureImage } from '@/store/commonSlice'
import { GiSonicShoes } from "react-icons/gi";
import { IoWoman } from "react-icons/io5";
import { SiNike } from "react-icons/si";
import { CgAdidas } from "react-icons/cg";
import { SiPuma } from "react-icons/si";
import { GiClothes } from "react-icons/gi";
import { SiZara } from "react-icons/si";
import { MdHMobiledata } from "react-icons/md";


 const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: IoWoman },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: GiSonicShoes },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: SiNike },
  { id: "adidas", label: "Adidas", icon: CgAdidas },
  { id: "puma", label: "Puma", icon: SiPuma },
  { id: "levi", label: "Levi's", icon: GiClothes },
  { id: "zara", label: "Zara", icon: SiZara },
  { id: "h&m", label: "H&M", icon: MdHMobiledata},
];

function Home() {
 
  const [currentSlide,setCurrentSlide]=useState(0);
  const{productList, productDetails}=useSelector(state=> state.shopingProductSlice)
  const{user}=useSelector(state=> state.auth)
    const {featureImageList}=useSelector(state=>state.commonFeature);
    const [openDetailsDialog,setOpenDetailsDialog]=useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  function handleNavigateToListingPage(getCurrentItem,section){
    sessionStorage.removeItem('filter');
    const currentFilter={
      [section]:[getCurrentItem.id]
    }
    sessionStorage.setItem("filter",JSON.stringify(currentFilter));
    navigate(`/shop/listing`)
  }

  function handleGetProductDetails(getCurrentProductId){
    dispatch(fetchProductDetails(getCurrentProductId))
  }
  function handleAddTOCart(getCurrentProductId){
    dispatch(addToCart({userId:user?.id,productId: getCurrentProductId,quantity:1})).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchCartItems(user?.id))
        toast("Cart Added")
      }
    })

  }

   
    useEffect(()=>{
      if(productDetails !== null) setOpenDetailsDialog(true)
  
    },[productDetails])

  useEffect(()=>{
    const timer=setInterval(()=>{
      setCurrentSlide(prevSlide=>(prevSlide +1)% featureImageList.length)
    },5000)
    return ()=>clearInterval(timer)
  },[featureImageList])
 
  useEffect(()=>{
    dispatch(fetchAllFilterdProducts({filterParams:{},sortParams:'price-lowtohigh'}))
  },[dispatch])
  console.log(productList)

   useEffect(()=>{
      dispatch(getFeatureImage());
    },[dispatch])

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='relative w-full md:h-[600px] h-[200px] overflow-hidden'>
        {
          featureImageList && featureImageList.length > 0 ? featureImageList.map((slide,index)=> <img
          src={slide?.image}
          key={index}
          className={`${index === currentSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full object-cover transition-opacity duration-1000`}
          />) : null
        }
        <Button onClick={()=> setCurrentSlide((prevSlide)=> (prevSlide - 1 + featureImageList.length) % featureImageList.length)} className='absolute md:top-40 lg:top-1/2 top-20 left-0.5 md:left-4   max-sm:h-7 max-sm:w-7 cursor-pointer transform -translate-y-1/2'>
          <ChevronLeftIcon className=' md:w-4 md:h-4'/>
        </Button>
        <Button onClick={()=> setCurrentSlide((prevSlide)=> (prevSlide + 1) % featureImageList.length)} className='absolute md:top-40 lg:top-1/2 md:right-4  top-20 right-0.5    max-sm:h-7 max-sm:w-7  cursor-pointer transform -translate-y-1/2'>
          <ChevronRightIcon className='w-4 h-4'/>
        </Button>
      </div>
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Shop By Category</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 '>
            {
              categoriesWithIcon.map(categoryItem=> <Card onClick={()=> handleNavigateToListingPage(categoryItem, 'category')} className='cursor-pointer  bg-white hover:shadow-lg transition-shadow '>
                <CardContent className='flex  flex-col items-center justify-center p-6'>
                  <categoryItem.icon className='w-12 h-12 mb-4 text-primary'/>
                  <span className='font-bold'>{categoryItem.label}</span>

                </CardContent>

              </Card>)
            }
          </div>
        </div>

      </section>
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Shop By Brand</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 '>
            {
              brandsWithIcon.map(brandItem=> <Card  onClick={()=> handleNavigateToListingPage(brandItem, 'brand')} className='cursor-pointer bg-white hover:shadow-lg transition-shadow '>
                <CardContent className='flex flex-col items-center justify-center p-6'>
                  <brandItem.icon className='w-12 h-12 mb-4 text-primary'/>
                  <span className='font-bold'>{brandItem.label}</span>

                </CardContent>

              </Card>)
            }
          </div>
        </div>

      </section>
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Feature Products</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {
              productList && productList.length > 0 ? productList.map(productItems=> <ShoppingProductTile handleAddTOCart={handleAddTOCart} handleGetProductDetails={handleGetProductDetails} product={productItems}/>) : null
            }
          </div>
          </div>


      </section>
        <ProductDetailsDialog productDetails={productDetails} open={openDetailsDialog} setOpen={setOpenDetailsDialog}/>

    </div>
  )
}

export default Home