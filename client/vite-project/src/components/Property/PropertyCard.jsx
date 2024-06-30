import React from 'react'
import { formatMoney } from 'src/utils/fn'
import { FiDollarSign } from "react-icons/fi";
import { MdBedroomChild } from "react-icons/md";
import { FaBath } from "react-icons/fa";
import { BiArea } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";

const PropertyCard = ({property}) => {
  return (
    <div className='border rounded-md'>
      <img src={property?.featuredImage} className='w-full h-[240px] object-cover rounded-t-md'></img>
      <div className='p-4 flex flex-col gap-4'>
        <h1 className='text-2xl font-medium uppercase text-gray-700 line-clamp-2'>{property?.name}</h1>
        <span className='text-main-500 text-xl font-bold flex items-center gap-1'>
          <FiDollarSign size={18}/>
          {` ${formatMoney(property?.price)}`}
        </span>
        <div className='flex items-center gap-4 text-sm'>
          <span className='flex gap-1 items-end text-gray-500'>
            <MdBedroomChild size={24}/>
            <span className='font-bold'>{property?.bedRoom}</span>
          </span>
          <span className='flex gap-2 items-end text-gray-500'>
            <FaBath size={24}/>
            <span className='font-bold'>{property?.bathRoom}</span>
          </span>
          <span className='flex gap-2 items-end text-gray-500'>
            <BiArea size={24}/>
            <span className='font-bold'>{property?.size} <span>m<sup>2</sup></span></span>
          </span>
        </div>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-2'>
              <img className='w-10 h-10 object-cover rounded-full' alt='' src={property?.rPostedBy?.avatar ||  `/avatar.jpg`}></img>
              <span className='text-gray-500'>{property?.rPostedBy?.name}</span>
            </div>
            <span className='px-4 py-1 text-xs flex items-center justify-center bg-green-600 text-white'>Agent</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md'>
              <IoShareSocialSharp />
            </span>
            <span className='w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md'>
              <FaRegHeart />
            </span>
          </div>
        </div>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-2'>
              <img className='w-10 h-10 object-cover rounded-full' alt='' src={property?.rOwner?.avatar ||  `/avatar.jpg`}></img>
              <span className='text-gray-500'>{property?.rOwner?.name}</span>
            </div>
            <span className='px-4 py-1 text-xs flex items-center justify-center bg-purple-600 text-white'>Owner</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md'>
              <IoShareSocialSharp />
            </span>
            <span className='w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md'>
              <FaRegHeart />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard