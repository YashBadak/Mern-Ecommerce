import { filterOptions } from '@/config'
import React, { Fragment } from 'react'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { SelectSeparator } from '../ui/select'

function ProductFilter({filter,handleFilter}) {
  return (
    <div className='bg-background  rounded-lg shadow-sm'>
        <div className='border-b p-4'>
            <h1 className='text-lg font-bold'>Filters</h1>
        </div>
        <div className='p-4 space-y-4'>
            {
                Object.keys(filterOptions).map(keyItems=><Fragment key={keyItems}>
                    <div className='text-md font-semibold'>
                        <h3>{keyItems}</h3>
                        <div className='grid gap-2 mt-2'>
                            {
                                filterOptions[keyItems].map(option=> <Label key={option.key} className='flex font-medium items-center gap-2'>
                                    <Checkbox
                                    className='cursor-pointer'
                                    checked={
                                        filter && Object.keys(filter).length > 0 &&
                                        filter[keyItems] && filter[keyItems].indexOf(option.id) > -1 
                                    }
                                    onCheckedChange={()=>handleFilter(keyItems,option.id)}  
                                    />
                                    {option.label}

                                </Label>)
                            }

                        </div>

                    </div>
                    <SelectSeparator/>
                </Fragment>)
            }

        </div>
    </div>
  )
}

export default ProductFilter