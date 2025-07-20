import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

function AddressCard({addressInfo, handleDeleteAddress,handleEditAddress,setCurrentSelectedAddress,selectedId}) {
  return (
   <Card onClick={setCurrentSelectedAddress ? ()=> setCurrentSelectedAddress(addressInfo) : null} className={`${selectedId?._id === addressInfo?._id ? 'border-3 border-red-900' : 'border-2 border-black'} cursor-pointer`}>
    <CardContent className='grid gap-4 px-10 '>
        <Label className='text-md'>Address:- {addressInfo?.address}</Label>
        <Label className='text-md'>City:- {addressInfo?.city}</Label>
        <Label className='text-md'>Pincode:- {addressInfo?.pincode}</Label>
        <Label className='text-md'>Phone:- {addressInfo?.phone}</Label>
        <Label className='text-md'>Notes:- {addressInfo?.notes}</Label>
    </CardContent>
    <CardFooter className='flex justify-between '>
        <Button onClick={()=>handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={()=>handleDeleteAddress(addressInfo)}>Delete</Button>
    </CardFooter>
   </Card>
  )
}

export default AddressCard