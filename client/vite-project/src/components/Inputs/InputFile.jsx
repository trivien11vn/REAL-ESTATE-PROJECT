import clsx from 'clsx'
import React, { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import { FaCloudUploadAlt } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { apiUploadImage } from 'src/apis/beyond';


const InputFile = ({ containerClassname, label, id, inputClassname, validate, placeholder}) => {
  const {register, formState:{errors}, watch} = useForm()
  const rawImages = watch(id) 

  const handleUpload = async(files) => {
    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append('file', file);
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    }
    const response = await apiUploadImage(formData)
    console.log(response)
  }

  useEffect(() => {
    if(rawImages && rawImages instanceof FileList && rawImages.length > 0) {
      handleUpload(rawImages)
    }
    else{

    }
  }, [rawImages])
  
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