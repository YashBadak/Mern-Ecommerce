import ShoppingProductTile from '@/components/shopping-view/ShoppingProductTile';
import { Input } from '@/components/ui/input'
import { addToCart, fetchCartItems } from '@/store/Shop/cart-slice';
import { getSearchResults, resetSearchResults } from '@/store/Shop/search-slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import ProductDetailsDialog from './ProductDetailsDialog';
import { fetchProductDetails } from '@/store/Shop/product-slice';

function Search() {
    const [keyword, setKeyword] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const { searchResults } = useSelector(state => state.shopSearch);
    const { user } = useSelector(state => state.auth);
    const { cartItems } = useSelector(state => state.shopCart)
    const { productDetails } = useSelector(state => state.shopingProductSlice)
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

    const dispatch = useDispatch();
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
    function handleGetProductDetails(getCurrentProductId){
      dispatch(fetchProductDetails(getCurrentProductId))
    }


    useEffect(() => {
        if (keyword && keyword.trim() !== '' && keyword.trim().length > 3) {
            setTimeout(() => {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
                dispatch(getSearchResults(keyword));

            }, 1000)

        } else {
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
            dispatch(resetSearchResults())
        }
    }, [keyword])
    
     useEffect(()=>{
        if(productDetails !== null) setOpenDetailsDialog(true)
    
      },[productDetails])
    return (
        <div className='container mx-auto md:px-6 px-4 py-8'>
            <div className='flex justify-center mb-8 '>
                <div className='w-full flex items-center'>
                    <Input name='keyword' value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder='Search Products' className='py-7' />
                </div>

            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {
                    searchResults && searchResults.length ? searchResults.map(item => <ShoppingProductTile handleAddTOCart={handleAddTOCart} handleGetProductDetails={handleGetProductDetails} product={item} />) : <h1 className='text-3xl font-extrabold'>No Result Found</h1>
                }
            </div>

            <ProductDetailsDialog productDetails={productDetails} open={openDetailsDialog} setOpen={setOpenDetailsDialog} />

        </div>
    )
}

export default Search