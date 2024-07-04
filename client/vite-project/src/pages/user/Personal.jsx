import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { InputFile, InputForm } from 'src/components'
import { useUserStore } from 'src/store/useUserStore'

const Personal = () => {
  const {current} = useUserStore()
  const {register, formState:{errors}, handleSubmit, setValue, clearErrors, reset} = useForm()

  useEffect(() => {
    if(current){
      reset({
        name: current?.name,
        address: current?.address,
        phone: current?.phone,
        email: current?.email,
        avatar: current?.avatar,
      })
    }
  }, [current])

  const getImages = (images) => {
    if(images && images.length > 0){
      clearErrors('images')
    }
    setValue(
      'images',
      images?.map(el => el?.path)
    )
  }

  console.log(current)
  return (
    <div className='h-full '>
      <div className='h-14 flex justify-between items-center border-b px-6'>
        <h1 className='text-3xl font-bold text-main-700'>Personal Information</h1>
      </div>
      <form className='max-w-[600px] mx-auto my-6 space-y-6'>
        <InputForm 
          id='name'
          register={register}
          validate={{required: 'Name is required'}}
          errors={errors}
          label='Full name'
          require
          placeholder='Type your full name'
        />
        <InputForm 
          id='phone'
          register={register}
          validate={{required: 'Phone is required'}}
          errors={errors}
          label='Phone number'
          require
          placeholder='Type your phone number'
          readOnly = {current?.userRoles?.some(el => el.roleCode !== '4')}
        />
        <InputForm 
          id='email'
          register={register}
          validate={{required: 'Email is required'}}
          errors={errors}
          label='Email address'
          require
          placeholder='Type your email address'
        />
        <InputForm 
          id='address'
          register={register}
          validate={{required: 'Address is required'}}
          errors={errors}
          label='Your address'
          require
          placeholder='Type your address'
        />
        <InputFile
          id='avatar'
          register={register}
          errors={errors}
          label='Avatar'
          validate={{required: 'This fill cannot be empty'}}
          getImage={getImages}
         />
      </form>
    </div>
  )
}

export default Personal