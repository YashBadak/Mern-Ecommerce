import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState={
    isLoading: false,
    searchResults:[],
}
export const getSearchResults=createAsyncThunk('/order/ getSearchResults',
    async(keyword)=>{
        const result=await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/search/${keyword}`);
            return result?.data
    }
)


const searchSlice=createSlice({
    name:'searchSlice',
    initialState,
    reducers:{
        resetSearchResults:(state)=>{
            state.searchResults=[];
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getSearchResults.pending,(state)=>{
            state.isLoading=true;

        }).addCase(getSearchResults.fulfilled,(state,action)=>{
            state.isLoading=true;
            state.searchResults= action.payload.data;

        }).addCase(getSearchResults.rejected,(state)=>{
            state.isLoading=false;
            state.searchResults=[];

        })
    
    }
})

export const {resetSearchResults}=searchSlice.actions;

export default searchSlice.reducer;