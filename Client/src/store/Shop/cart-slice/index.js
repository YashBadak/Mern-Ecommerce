import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


const initialState={
    isLoading:false,
    cartItems: []
}

export const addToCart= createAsyncThunk('cart/addToCart', async({userId,productId, quantity})=>{

    const response=await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/cart/add`,{
        userId,
        productId,
        quantity
    })
    return response.data
})

export const fetchCartItems= createAsyncThunk('cart/fetchCartItems', async(userId)=>{

    const response=await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/cart/get/${userId}`
       )
    return response.data
})

export const updateCartQuantity= createAsyncThunk('cart/updateCartQuantity', async({userId,productId,quantity})=>{

    const response=await axios.put(`${import.meta.env.VITE_API_URL}/api/shop/cart/update-cart`,{
        userId,
        productId,
        quantity
    })
    return response.data
})

export const deleteCartItems= createAsyncThunk('cart/deleteCartItems', async({userId,productId})=>{

    const response=await axios.delete(`${import.meta.env.VITE_API_URL}/api/shop/cart/${userId}/${productId}`
    )
    return response.data
})


const shoppingCartSlice=createSlice({
    name:'shoppingCart',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addToCart.pending,(state)=>{
            state.isLoading=true
        }).addCase(addToCart.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.cartItems=action.payload.data
        }).addCase(addToCart.rejected,(state)=>{
            state.isLoading=false,
            state.cartItems=[]
        }).addCase(fetchCartItems.pending,(state)=>{
            state.isLoading=true
        }).addCase(fetchCartItems.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.cartItems=action.payload.data
        }).addCase(fetchCartItems.rejected,(state)=>{
            state.isLoading=false,
            state.cartItems=[]
        }).addCase(updateCartQuantity.pending,(state)=>{
            state.isLoading=true
        }).addCase(updateCartQuantity.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.cartItems=action.payload.data
        }).addCase(updateCartQuantity.rejected,(state)=>{
            state.isLoading=false,
            state.cartItems=[]
        }).addCase(deleteCartItems.pending,(state)=>{
            state.isLoading=true
        }).addCase(deleteCartItems.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.cartItems=action.payload.data
        }).addCase(deleteCartItems.rejected,(state)=>{
            state.isLoading=false,
            state.cartItems=[]
        })

    }
})


export default shoppingCartSlice.reducer;