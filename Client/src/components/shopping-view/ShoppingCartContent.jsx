import { Minus, Plus, Trash } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItems, updateCartQuantity } from '@/store/Shop/cart-slice';
import { toast } from 'sonner';

function ShoppingCartContent({ cartItem }) {
    const { user } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.shopCart);
    const {productList}=useSelector(state=>state.shopingProductSlice)

    const dispatch = useDispatch();

   function handleUpdateQuantity(cartItem, typeOfAction) {
    if (typeOfAction === "plus") {
        const currentProductIndex = productList.findIndex(product => product._id === cartItem?.productId);

        if (currentProductIndex !== -1) {
            const totalStock = productList[currentProductIndex]?.totalStock || 0;
            const currentCartItemIndex = cartItems?.items?.findIndex(item => item.productId === cartItem?.productId);

            if (currentCartItemIndex > -1) {
                const currentQuantity = cartItems.items[currentCartItemIndex].quantity;
                if (currentQuantity + 1 > totalStock) {
                    toast(`Only ${totalStock} in stock for this item`);
                    return;
                }
            }
        } else {
            toast("Product not found in the product list");
            return;
        }
    }

    dispatch(updateCartQuantity({
        userId: user?.id,
        productId: cartItem?.productId,
        quantity: typeOfAction === "plus" ? cartItem?.quantity + 1 : cartItem?.quantity - 1
    })).then((data) => {
        if (data?.payload?.success) {
            toast("Cart Updated Successfully");
        }
    });
}

    function handleCartItemDelete(getCartItems) {
        dispatch(deleteCartItems({ userId: user?.id, productId: getCartItems?.productId })).then((data) => {
            if (data?.paylaod?.success) {
                toast("Cart Item Deleted SuccessFully")
            }
        })

    }

    return (
        <div className='flex items-center space-x-4 px-4'>
            <img src={cartItem?.image} alt={cartItem?.title} className='w-20 h-20 rounded-xl object-cover' />
            <div className='flex-1'>
                <h3 className='font-extrabold'>{cartItem?.title}</h3>
                <div className='flex items-center mt-1'>
                    <Button variant='outline' size='icon' className='mr-2' disabled={cartItem?.quantity === 1} onClick={() => handleUpdateQuantity(cartItem, 'minus')} >
                        <Minus className='w-4 h-4' />
                        <span className='sr-only'>Decrease</span>
                    </Button>
                    <span className='font-semibold text-md'>{cartItem?.quantity}</span>
                    <Button variant='outline' size='icon' className='ml-2' onClick={() => handleUpdateQuantity(cartItem, 'plus')}  >
                        <Plus className='w-4 h-4' />
                        <span className='sr-only'>Increase</span>
                    </Button>
                </div>
            </div>
            <div className='flex flex-col items-end'>
                <p className='font-semibold text-lg mb-2'>${((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * cartItem?.quantity).toFixed(2)}</p>
                <Trash onClick={() => handleCartItemDelete(cartItem)} className='mt-1 cursor-pointer' size={20} />
            </div>

        </div>
    )
}

export default ShoppingCartContent