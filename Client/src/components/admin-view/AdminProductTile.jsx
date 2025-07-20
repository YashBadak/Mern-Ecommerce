import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'

function AdminProductTile({
  product,
  setCurrentEditedId,
  setOpenCreateProductDialog,
  setFormData,
  handleRemoveFunction
}) {
  return (
    <Card className="w-full  max-w-sm mx-auto rounded-lg overflow-hidden p-0">
      <div>
        {/* Responsive fixed aspect ratio box for image */}
        <div className="relative w-full h-[300px]">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-full object-cover object-top"
          />
        </div>

        <CardContent>
          <h1 className="mt-5 text-xl font-bold">{product?.title}</h1>
           <div className="flex justify-between items-center mb-2">
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">${product?.salePrice}</span>
            ) : null}
            <span
              className={`${
                product?.salePrice > 0 ? "line-through text-lg text-gray-500" : ""
              } text-lg font-semibold `}
            >
              ${product?.price}
            </span>
          </div>
        </CardContent>

        <CardFooter>
          <div className="flex justify-between w-full mt-5 mb-5">
            <Button
              onClick={() => {
                setCurrentEditedId(product?._id)
                setFormData(product)
                setOpenCreateProductDialog(true)
              }}
              className="p-5 text-sm"
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                handleRemoveFunction(product?._id)
              }}
              className="p-5 text-sm"
            >
              Delete
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}

export default AdminProductTile
