import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { FaCloudUploadAlt } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { apiUploadImage } from 'src/apis/beyond';
import { CgSpinner } from "react-icons/cg";

const InputFile = ({ containerClassname, label, id, validate, multiple, getImage}) => {
  const {register, formState:{errors}, watch} = useForm()
  const rawImages = watch(id) 
  const [images, setImages ] = useState([])
  const imageLink = []
  const handleUpload = async(files) => {
    const formData = new FormData()
    setIsLoading(true)
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append('file', file);
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
      const response = await apiUploadImage(formData)
      if(response.status === 200){
        imageLink.push(response.data.secure_url)
      }
    }
    setIsLoading(false)
    setImages(imageLink)
  }


  useEffect(() => {
    if(images?.length > 0 && images){
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
          {images?.map((el,idx) => (<div key={idx} className='col-span-1'><img src={el} alt='' className='w-full object-contain'></img></div>))}
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