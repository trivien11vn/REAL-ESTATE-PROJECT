import React from 'react'
import { formatMoney } from 'src/utils/fn'
import { FiDollarSign } from "react-icons/fi";

const PropertyCard = ({property}) => {
  return (
    <div className='border rounded-md'>
      <img src={property?.featuredImage} className='w-full h-[240px] object-cover rounded-t-md'></img>
      <div className='p-4 flex flex-col gap-2'>
        <h1 className='text-2xl uppercase text-gray-700'>{property?.name}</h1>
        <span className='text-main-500 text-lg font-bold flex items-center gap-1'>
          <FiDollarSign size={18}/>
          {` ${formatMoney(property?.price)}`}
        </span>
      </div>
    </div>
  )
}

export default PropertyCard