import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { FaCloudUploadAlt } from "react-icons/fa";


const InputFile = ({ containerClassname, label, id, register, errors={}, inputClassname, validate, placeholder}) => {
  return (
    <div className={twMerge(clsx('flex flex-col gap-2 w-full', containerClassname))}>
    {label && <span className='font-medium text-main-700'>{label}</span>}
    <input 
      type= 'file'
      id={id} 
      {...register(id, validate)}  
      className='hidden'
    />
    <label className='bg-gray-100 rounded-sm cursor-pointer w-full p-16 flex flex-col gap-2 items-center justify-center' htmlFor={id}>
        <span className='text-5xl text-gray-300 '><FaCloudUploadAlt /></span>
        <small className= 'italic'>Please upload a image (JPEG, PNG, JPG)</small>
    </label>
    {errors[id] && <small className='italic text-red-500'>{errors[id]?.message}</small>}
  </div>
  )
}

export default InputFile