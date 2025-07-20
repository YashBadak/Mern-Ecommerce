import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import CommonForm from '../common/CommonForm'
import { addressFormControls } from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import { addNewAddress, deleteAddress, editAaddress, fetchAllAddresses } from '@/store/Shop/address-slice';
import AddressCard from './AddressCard';
import { toast } from 'sonner';

const initialAddressFromData = {
    address: '',
    city: '',
    pincode: '',
    phone: '',
    notes: ''
}

function Accounts({setCurrentSelectedAddress,currentSelectedAddress}) {
    const [formData, setFormData] = useState(initialAddressFromData);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const { user } = useSelector(state => state.auth);
    const { addressList } = useSelector(state => state.shopAddress);
    const dispatch = useDispatch();

    function handleManageAddress(event) {
        event.preventDefault();

        if(addressList.length >= 3 && currentEditedId === null){
            setFormData(initialAddressFromData);
            toast("You Can Add MAX 3 Addresses");
            return;
        }
        currentEditedId !== null ? dispatch(editAaddress({
            userId: user?.id, addressId: currentEditedId, formData
        })).then((data)=>{
            if(data?.payload?.success){
            dispatch(fetchAllAddresses(user?.id))
            setCurrentEditedId(null);
            setFormData(initialAddressFromData);
            toast("Address Updated");
            }
        }) :
        dispatch(addNewAddress({
            ...formData,
            userId: user?.id
        })).then((data) => {
            console.log(data);
            if (data?.payload?.success) {
                dispatch(fetchAllAddresses(user?.id))
                setFormData(initialAddressFromData);
                toast("New Address Created");
            }
        })
    }

    function handleDeleteAddress(getAddressId) {
        const userId = user?.id;
        const addressId = getAddressId?._id;
        console.log(userId, addressId);
        dispatch(deleteAddress({ userId: user?.id, addressId: getAddressId._id })).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllAddresses(user?.id));
                toast("Address Deleted SuccesFully")
            }
        })

    }

    function handleEditAddress(getCurrentAddress) {
        setCurrentEditedId(getCurrentAddress?._id);
        setFormData({
            ...formData,
            address: getCurrentAddress?.address,
            city: getCurrentAddress?.city,
            pincode: getCurrentAddress?.pincode,
            phone: getCurrentAddress?.phone,
            notes: getCurrentAddress?.notes,

        })

    }

    function isFormValid() {
        return Object.keys(formData).map((key) => formData[key].trim() !== '').every((item) => item);
    }

    useEffect(() => {
        console.log(user?.id)
        dispatch(fetchAllAddresses(user?.id))
    }, [dispatch])
    return (
        <Card>
            <div className='mb-5 p-3  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 '>
                {
                    addressList && addressList.length > 0 ? addressList.map((item) => <AddressCard key={item._id} selectedId={currentSelectedAddress} handleEditAddress={handleEditAddress} handleDeleteAddress={handleDeleteAddress} addressInfo={item} setCurrentSelectedAddress={setCurrentSelectedAddress} />) : null
                }
            </div>
            <CardHeader>
                <CardTitle>{currentEditedId !==null ? "Edit Address" : "Add New Address"}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
                <CommonForm
                    formControls={addressFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={currentEditedId != null ? 'Edit' : 'Add'}
                    onSubmit={handleManageAddress}
                    isBtnDisabled={!isFormValid()}

                />

            </CardContent>
        </Card>
    )
}

export default Accounts