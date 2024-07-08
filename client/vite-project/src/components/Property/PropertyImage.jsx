import React, { memo, useState } from 'react'
import { Button, ImageDetail } from '..'
import { IoMdImages } from "react-icons/io";
import { useAppStore } from 'src/store/useAppStore';
const PropertyImage = ({images = []}) => {
    const {setModal} = useAppStore()
    console.log(images)
    const handleNavigate = (index) => {
      setModal(true, <ImageDetail images={images} forceIndex = {index}/>)
    }
  return (
    <div className='w-full grid grid-cols-4 grid-rows-2 gap-2 relative'>
        <img onClick={() => handleNavigate(0)} src={images[0]} alt='picture-1' className='w-full h-full col-span-2 row-span-2 rounded-l-md object-cover cursor-pointer'/> 
        <img onClick={() => handleNavigate(1)} src={images[1]} alt='picture-2' className='w-full h-full col-span-1 row-span-1 object-cover cursor-pointer'/> 
        <img onClick={() => handleNavigate(2)} src={images[2]} alt='picture-3' className='w-full h-full col-span-1 row-span-1 rounded-tr-md object-cover cursor-pointer'/> 
        <img onClick={() => handleNavigate(3)} src={images[3]} alt='picture-4' className='w-full h-full col-span-1 row-span-1 object-cover cursor-pointer'/> 
        <img onClick={() => handleNavigate(4)} src={images[4]} alt='picture-5' className='w-full h-full col-span-1 row-span-1 rounded-br-md object-cover cursor-pointer'/> 
        <div className='absolute bottom-4 right-4'>
            <Button onClick={() => setModal(true, <ImageDetail images={images}/>)} className='bg-white border border-main-600 text-main-600 font-bold flex gap-1 hover:bg-gray-200'>
                <span className='text-2xl'><IoMdImages /></span>
                <span>Show all pictures</span>
            </Button>
        </div>
    </div>
  )
}

export default memo(PropertyImage)
//memo: tránh việc render lại component không cần thiết nếu các props của nó không thay đổi