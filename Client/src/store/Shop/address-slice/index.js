import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    isLoading:false,
    addressList:[]
}


export const addNewAddress=createAsyncThunk('addresses/addNewAddress',
    async(formData)=>{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/address/add`, formData)
        return response.data;

})
export const fetchAllAddresses=createAsyncThunk('address/fetchAllAddresses',
    async(userId)=>{
        const response=await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/address/get/${userId}`)
        return response.data;

})
export const editAaddress=createAsyncThunk('address/editAaddress',
    async({userId,addressId,formData})=>{
        const response=await axios.put(`${import.meta.env.VITE_API_URL}/api/shop/address/update/${userId}/${addressId}`, formData);
        return response.data;

})
export const deleteAddress = createAsyncThunk('address/deleteAddress',
    async ({ userId, addressId }, thunkAPI) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/shop/address/delete/${userId}/${addressId}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);





const addressSlice=createSlice({
    name: 'address',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
      builder.addCase(addNewAddress.pending,(state)=>{
                  state.isLoading=true;
              }).addCase(addNewAddress.fulfilled,(state,action)=>{
                  state.isLoading=false;
              }).addCase(addNewAddress.rejected,(state)=>{
                  state.isLoading=false;
              }).addCase(fetchAllAddresses.pending,(state)=>{
                  state.isLoading=true;
              }).addCase(fetchAllAddresses.fulfilled,(state,action)=>{
                  state.isLoading=false;
                  state.addressList=action.payload.data;
              }).addCase(fetchAllAddresses.rejected,(state)=>{
                  state.isLoading=false;
                  state.addressList=[];
              })

    }
})

export default addressSlice.reducer;