import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { apiUpdateCurrent } from 'src/apis/user'
import { Button, InputFile, InputForm } from 'src/components'
import { useUserStore } from 'src/store/useUserStore'

const Personal = () => {
  const {current, getCurrent} = useUserStore()
  const [isChangeAvatar, setIsChangeAvatar] = useState(false)
  const {register, formState:{errors, isDirty}, handleSubmit, setValue, clearErrors, reset, watch} = useForm()

  const initAvatar = watch('avatar')
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
      clearErrors('avatar')
    }
    setValue(
      'avatar',
      images?.map(el => el?.path)
    )
  }

  const onSubmit = async(data) => {
    const {avatar, ...payload} = data
    if(Array.isArray(avatar)){
      payload.avatar = avatar
    } //neu la string, nghia la k co thay doi => ko can update Avatar
    const response = await apiUpdateCurrent(payload)
    if(!response.success){
      toast.error(response?.mes)
    }
    else{
      toast.success(response?.mes)
      getCurrent()
      setIsChangeAvatar(false)
    }
  }
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
          readOnly =  {!(current?.userRoles?.length === 1 && current?.userRoles[0]?.roleCode === '4')}
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
        <div className='flex flex-col gap-3'>
          <span 
            className='font-medium text-main-700'>{`Avatar `}
            <span className='text-xs cursor-pointer text-orange-500 hover:underline' onClick={() => setIsChangeAvatar(prev => !prev)}>
            {isChangeAvatar ? 'Undo ❌' : 'Change 🌄'}
            </span>
          </span>
          {
            isChangeAvatar ?
            <InputFile
              id='avatar'
              register={register}
              errors={errors}
              getImage={getImages}
            /> 
            : 
            <img className='w-28 h-28 object-cover rounded-full' src={initAvatar || `/avatar.jpg`}/>
          }
        </div>
        <Button className='mx-auto my-8' onClick={handleSubmit(onSubmit)}>
          Update
        </Button>
      </form>
    </div>
  )
}

export default Personal