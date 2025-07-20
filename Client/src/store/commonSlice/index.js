import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    isLoading:false,
    featureImageList:[]
}


export const addFeatureImages=createAsyncThunk('addresses/addFeatureImages',
    async(image)=>{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/common/feature/add`,{image})
        return response.data;

})
export const getFeatureImage=createAsyncThunk('address/getFeatureImage',
    async()=>{
        const response=await axios.get(`${import.meta.env.VITE_API_URL}/api/common/feature/get`)
        
        return response.data;

})
export const deleteFeatureImage=createAsyncThunk('address/deleteFeatureImage',
    async(id)=>{
        const response=await axios.delete(`${import.meta.env.VITE_API_URL}/api/common/feature/${id}`)
        
        return response.data;

})
const commonSlice=createSlice({
    name: 'commonSlice',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
      builder.addCase(getFeatureImage.pending,(state)=>{
                  state.isLoading=true;
              }).addCase(getFeatureImage.fulfilled,(state,action)=>{
                  state.isLoading=false;
                  state.featureImageList=action.payload.data;
              }).addCase(getFeatureImage.rejected,(state)=>{
                  state.isLoading=false;
                  state.featureImageList=[];
              }).addCase(deleteFeatureImage.pending,(state)=>{
                  state.isLoading=true;
              }).addCase(deleteFeatureImage.fulfilled,(state,action)=>{
                  state.isLoading=false;
                  state.featureImageList=action.payload.data;
              }).addCase(deleteFeatureImage.rejected,(state)=>{
                  state.isLoading=false;
                  state.featureImageList=[];
              })
    }
})  

export default commonSlice.reducer;