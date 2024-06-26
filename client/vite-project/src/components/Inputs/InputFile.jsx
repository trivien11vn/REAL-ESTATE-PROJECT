import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { FaCloudUploadAlt } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { apiUploadImage } from 'src/apis/beyond';
import { CgSpinner } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-toastify';

const InputFile = ({ containerClassname, label, id, validate, multiple, getImage, errors}) => {
  const {register, watch} = useForm()
  const rawImages = watch(id) 
  const [images, setImages ] = useState([])
  const uploadPromise = []
  const handleUpload = async(files) => {
    const formData = new FormData()
    setIsLoading(true)
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append('file', file);
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
      uploadPromise.push(apiUploadImage(formData));
    }

    const response = await Promise.all(uploadPromise)
    setIsLoading(false)
    if(response && response?.length > 0){
      const tempArrImage = []
      for(let result of response){
        if(result?.status === 200){
          tempArrImage.push({id: result?.data?.public_id, path: result?.data?.secure_url})
        }
      }
      setImages(tempArrImage)
    }  
    else{
      toast.error('Upload image failed')
    }
  }


  useEffect(() => {
    if(images?.length >= 0 && images){
      getImage(images)
    }
  }, [images])
  
  useEffect(() => {
    if(rawImages && rawImages instanceof FileList && rawImages.length > 0) {
      handleUpload(rawImages)
    }
    else{

    }
  }, [rawImages])
  
  const [isLoading, setIsLoading] = useState(false)
  
  const handleDeleteImage = (e, imageId) => {
    e.preventDefault()
    setImages(prev => prev.filter(image => image.id !== imageId))
  }
  return (
    <div className={twMerge(clsx('flex flex-col gap-2 w-full', containerClassname))}>
    {label && <span className='font-medium text-main-700'>{label}</span>}
    <input 
      type= 'file'
      id={id} 
      {...register(id, validate)}  
      className='hidden'
      multiple={multiple}
    />
    <label className='bg-gray-100 rounded-sm cursor-pointer w-full p-16 flex flex-col gap-2 items-center justify-center' htmlFor={id}>
        {isLoading ? <span className='animate-spin text-main-600'><CgSpinner size={25}/></span> : 
        images?.length > 0 ? 
        <div className='grid grid-cols-4 gap-4'>
          {images?.map((el,idx) => (<div key={idx} className='col-span-1 relative'>
          <span  onClick={(e) => handleDeleteImage(e, el?.id)} className='w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer absolute top-1 right-1'><IoMdClose size={18}/></span>
          <img src={el?.path} alt='' className='w-full object-contain'></img></div>))}
        </div>:
        <>
        <span className='text-5xl text-gray-300 '><FaCloudUploadAlt /></span>
        <small className= 'italic'>Please upload a image (JPEG, PNG, JPG)</small>
        </>
      }
    </label>
    {errors[id] && <small className='italic text-red-500'>{errors[id]?.message}</small>}
  </div>
  )
}

export default InputFile