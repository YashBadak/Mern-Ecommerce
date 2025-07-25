import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState={
    isLoading: false,
    productList:[],
    productDetails: null
}


export const fetchAllFilterdProducts=createAsyncThunk('/products/ fetchAllFilterdProducts',
    async({filterParams,sortParams})=>{
        const query= new URLSearchParams({
            ...filterParams,
            sortBy: sortParams
        })
        const result=await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`);
            return result?.data
    }
)
export const fetchProductDetails=createAsyncThunk('/products/ fetchProductDetails',
    async(id)=>{
        const result=await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products/get/${id}`);
            return result?.data
    }
)


const shopProductSlice=createSlice({
    name:'shoppingProducts',
    initialState,
    reducers:{
        setProductDetails:(state)=>{
            state.productDetails=null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllFilterdProducts.pending,(state,action)=>{
            state.isLoading=true;
        }).addCase(fetchAllFilterdProducts.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.productList=action.payload.data;
        }).addCase(fetchAllFilterdProducts.rejected,(state,action)=>{
            state.isLoading=false;
            state.productList=[]
        }).addCase(fetchProductDetails.pending,(state,action)=>{
            state.isLoading=true;
        }).addCase(fetchProductDetails.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.productDetails=action.payload.data;
        }).addCase(fetchProductDetails.rejected,(state,action)=>{
            state.isLoading=false;
            state.productDetails=null;
        })
    }
})

export const {setProductDetails}= shopProductSlice.actions;

export default shopProductSlice.reducer