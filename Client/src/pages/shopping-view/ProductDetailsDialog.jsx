import StarRating from '@/components/common/StarRating'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { addToCart, fetchCartItems } from '@/store/Shop/cart-slice'
import { setProductDetails } from '@/store/Shop/product-slice'
import { addReview, getReviews } from '@/store/Shop/review-slice'
import { StarIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

function ProductDetailsDialog({ open, setOpen, productDetails }) {
    const [reviewMsg, setReviewMsg] = useState('');
    const [rating, setRating] = useState(0);

    const { user } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.shopCart)
    const { reviews } = useSelector(state => state.shopReview)
    const dispatch = useDispatch();
    function handleRatingChange(getRating) {
        setRating(getRating);

    }
    function handleAddTOCart(getCurrentProductId, getTotalStock) {
        const getCartItems = cartItems.items || [];
        if (getCartItems.length) {
            const indexOfCurrentItem = getCartItems.findIndex(item => item.productId === getCurrentProductId);
            if (indexOfCurrentItem > -1) {
                const getQuantity = getCartItems[indexOfCurrentItem].quantity;
                if (getQuantity + 1 > getTotalStock) {
                    toast(`only ${getQuantity} Quantity Can Be Added For This Item`)
                    return;
                }
            }
        }
        dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user?.id))
                toast("Cart Added")
            }
        })

    }

    function handlechange() {
        setOpen(false)
        dispatch(setProductDetails())
        setRating(0);
        setReviewMsg("")
    }

    function handleAddReview() {
        dispatch(addReview({
            productId: productDetails?._id,
            userId: user?.id,
            userName: user?.userName,
            reviewMessage: reviewMsg,
            reviewValue: rating,
        })).then((data)=>{
            if(data?.payload?.success){
                setRating(0);
                setReviewMsg("")
                dispatch(getReviews(productDetails?._id))
                toast("Review Added SuccessFully");
            }
        })
    }

    useEffect(()=>{
        if(productDetails !== null) dispatch(getReviews(productDetails?._id));

    },[productDetails])
    console.log(reviews, 'reviews')

    const averageReview= reviews && reviews.length > 0 ? reviews.reduce((sum,reviewItem)=>sum+reviewItem.reviewValue,0)/reviews.length : 0;
    return (
        <Dialog open={open} onOpenChange={handlechange}>
           <DialogContent className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:p-6 md:p-8 lg:p-12 max-w-[95vw] sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[50vw] overflow-y-auto max-h-[95vh]'>
  <div className='flex justify-center items-center md:items-start'>
  <div className='w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] aspect-square overflow-hidden rounded-xl shadow-md'>
    <img
      src={productDetails?.image}
      alt={productDetails?.title}
      className='w-full h-full object-cover'
    />
  </div>
</div>

  <div className='flex flex-col gap-4'>
    <div>
      <h1 className='text-2xl sm:text-3xl font-bold'>{productDetails?.title}</h1>
      <p className='mt-2 text-base sm:text-lg font-medium text-muted-foreground'>
        {productDetails?.description}
      </p>
    </div>

    <div className='flex justify-between items-center mt-3'>
      <h1 className='text-lg sm:text-xl font-bold'>$ {productDetails?.price}</h1>
      <h1 className={`${productDetails?.salePrice > 0 ? "line-through text-gray-500" : ''} text-sm sm:text-lg font-semibold`}>
        $ {productDetails?.salePrice}
      </h1>
    </div>

    <div className='flex items-center gap-2 mt-2'>
      <div className='flex items-center gap-0.5'>
        <StarRating rating={averageReview} />
      </div>
      <span className='text-sm text-muted-foreground'>({averageReview.toFixed(2)})</span>
    </div>

    <div className='mt-4'>
      {
        productDetails?.totalStock === 0 ? (
          <Button className='w-full p-5 text-base sm:text-xl opacity-60 cursor-not-allowed'>
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddTOCart(productDetails?._id, productDetails?.totalStock)}
            className='w-full p-5 text-base sm:text-xl'
          >
            Add To Cart
          </Button>
        )
      }
    </div>

    <Separator />

    <div>
      <h1 className='text-lg sm:text-xl font-bold py-2'>Reviews</h1>
      <div className='flex flex-col gap-4 max-h-52 overflow-auto pr-1'>
        {
          reviews && reviews.length > 0 && reviews.map((items) => (
            <div className='flex gap-3'>
              <Avatar className='w-10 h-10 border'>
                <AvatarFallback>{items?.userName[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className='flex flex-col gap-1'>
                <div className='flex items-center gap-2'>
                  <h1 className='font-bold'>{items?.userName}</h1>
                </div>
                <div className='flex items-center gap-0.5'>
                  <StarRating rating={items?.reviewValue} />
                </div>
                <p className='text-muted-foreground text-sm'>{items?.reviewMessage}</p>
              </div>
            </div>
          ))
        }
      </div>

      <div className='flex flex-col gap-3 mt-4'>
        <Label>Write A Review</Label>
        <div className='flex gap-2'>
          <StarRating rating={rating} handleRatingChange={handleRatingChange} />
        </div>
        <Input
          name='reviewMsg'
          value={reviewMsg}
          onChange={(e) => setReviewMsg(e.target.value)}
          placeholder='Add Review'
        />
        <Button onClick={handleAddReview} disabled={reviewMsg.trim() === ''}>Submit</Button>
      </div>
    </div>
  </div>
</DialogContent>


        </Dialog>
    )
}

export default ProductDetailsDialog