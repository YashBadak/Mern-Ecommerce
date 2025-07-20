import ProductImageUpload from '@/components/admin-view/ProductImageUpload';
import { Button } from '@/components/ui/button';
import { addFeatureImages, deleteFeatureImage, getFeatureImage } from '@/store/commonSlice';
import { Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { featureImageList } = useSelector(state => state.commonFeature);
  const dispatch = useDispatch();

  function handleUploadFeatureImage() {
    dispatch(addFeatureImages(uploadImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImage());
        setImageFile(null);
        setUploadImageUrl('');
      }
    });
  }

  function handleDeleteFeatureImage(getId) {
    dispatch(deleteFeatureImage(getId)).then((data) => {
      dispatch(getFeatureImage());
    });
  }

  useEffect(() => {
    dispatch(getFeatureImage());
  }, [dispatch]);

  return (
    <div className='px-4 sm:px-6 lg:px-8 py-6'>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadImageUrl={uploadImageUrl}
        setUploadImageUrl={setUploadImageUrl}
        imageLoadingState={imageLoadingState}
        setImageLoadingState={setImageLoadingState}
        isCustomStyling={true}
      />

      <Button
        onClick={handleUploadFeatureImage}
        className='mt-5 w-full py-5 text-base sm:text-lg'
      >
        Upload
      </Button>

      <div className='mt-6 flex flex-col gap-6'>
        {
          featureImageList && featureImageList.length > 0
            ? featureImageList.map((items, index) => (
              <div key={index} className='relative rounded-lg overflow-hidden shadow-md'>
                <img
  src={items?.image}
  className='w-full aspect-[16/9] sm:aspect-[21/9] object-cover rounded-t-lg'
/>

                <Button
                  onClick={() => handleDeleteFeatureImage(items?._id)}
                  variant='outline'
                  size='icon'
                  className='absolute top-3 right-3 bg-white/70 backdrop-blur-sm'
                >
                  <Trash />
                </Button>
              </div>
            ))
            : null
        }
      </div>
    </div>
  );
}

export default AdminDashboard;
