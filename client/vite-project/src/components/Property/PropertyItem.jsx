//hien thi trong related property, listing property
import React from 'react'
import { Link } from 'react-router-dom'
import { formatMoney } from 'src/utils/fn'
import path from 'src/utils/path'

const PropertyItem = ({id,name,featuredImage,price,listingType,rPropertyType}) => {
  return (
    <div className='p-3 rounded-md bg-white odd:bg-gray-400 even:bg-green-400 grid grid-cols-10 gap-2'>
    <img src={featuredImage} className='col-span-2 w-full object-contain rounded-md' />
    <div className='flex flex-col col-span-8'>
        <Link 
            to={`/${path.PROPERTIES}/${id}`} 
            className='hover:underline font-semibold text-main-600 line-clamp-2 w-full leading-4'
            state={{name}}
        >
            {name}
        </Link>
        <span className='text-orange-600 font-semibold text-xl'>{"$ "+formatMoney(price)}</span>
        <span className='flex gap-2 items-center text-xs'>
            <span className='flex'>Listing Type:<span className='font-semibold'>{listingType}</span></span>
            <span className='flex'>Property Type:<span className='font-semibold'>{rPropertyType?.name}</span></span>
        </span>
    </div>

    </div>
  )
}

export default PropertyItem