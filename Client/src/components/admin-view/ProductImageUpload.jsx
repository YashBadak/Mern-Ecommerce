import React, { useEffect, useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { FileIcon, UploadCloud, XIcon } from 'lucide-react'
import { Button } from '../ui/button'
import axios from 'axios'
import { Skeleton } from '../ui/skeleton'

function ProductImageUpload({imageFile,setImageFile,uploadImageUrl,setUploadImageUrl, imageLoadingState,setImageLoadingState,isEdited, isCustomStyling=false}) {
    const inputRef=useRef(null)
    const handleImageFileChange=(event)=>{
        const selectedFile=event.target.files?.[0];
        if(selectedFile) setImageFile(selectedFile);

    }
    const handleOnDragOver=(event)=>{
        event.preventDefault();

    }
    const handleDrop=(event)=>{
        event.preventDefault();
        const droppedFile= event.dataTransfer.files?.[0];
        if(droppedFile) setImageFile(droppedFile);

    }

    const handleRemoveImage=()=>{
        setImageFile(null);
        if(inputRef.current){
            inputRef.current.value='';
        }
    }

    async function uploadImageToCloudinary(){
        setImageLoadingState(true);
        const data=new FormData();
        data.append("my_file",imageFile);
        const response=await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`,data)
        if(response?.data?.success) {
            setUploadImageUrl(response.data.result.url)
            setImageLoadingState(false);
        }

    }

    useEffect(()=>{
        if(imageFile != null) uploadImageToCloudinary();
    },[imageFile])
  return (
    <div className={`${isEdited  ? "opacity-60" : ''} ${isCustomStyling ? '' : 'max-w-md mx-auto'} w-full  mx-auto`}>
        <Label className='text-lg font-semibold m-2 block'>Upload Image</Label>
        <div onDragOver={handleOnDragOver} onDrop={handleDrop} className='border-2   border-dashed  m-2 rounded-lg'>
            <Input id='image-upload' disabled={isEdited} type='file' className='hidden' ref={inputRef} onChange={handleImageFileChange}/>
            {
                !imageFile ? (<Label htmlFor='image-upload' className='flex flex-col justify-center items-center h-32 cursor-pointer'>
                    <UploadCloud className='w-10 h-10 mb-2'/>
                    <span>Drag & Drop Or Click To Uoload The Image</span>
                </Label>) : (
                    imageLoadingState ? <Skeleton className='h-10 m-5 bg-gray-100'/> : 
                     <div className='flex items-center justify-between '>
                    <div className='flex items-center'>
                    <FileIcon className='w-8 text-primary mr-2 h-8'/>
                    </div>
                    <p className='text-sm font-medium'>{imageFile.name}</p>
                    <Button variant='ghost' size='icon' className='' onClick={handleRemoveImage}>
                        <XIcon className='w-4 h-4'/>
                        <span className='sr-only'>Remove File</span>

                    </Button>

                </div>)
            }

        </div>
    </div>
  )
}

export default ProductImageUpload