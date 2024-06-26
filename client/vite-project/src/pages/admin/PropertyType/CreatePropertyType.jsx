import React from 'react'
import { Button, InputFile, InputForm, InputText, TextArea, Title } from 'src/components'
import { CiSquarePlus } from "react-icons/ci";
import { useForm } from 'react-hook-form';
import { apiCreateNewPropertyType } from 'src/apis/propertyType';
import { toast } from 'react-toastify';

const CreatePropertyType = () => {
  const {register, formState: {errors}, handleSubmit, reset, setValue, setError, clearErrors} = useForm()
  const handleSubmitForm = async (data) => {
    if(!data?.images || data?.images?.length === 0){
      setError('images', {
        message: 'This fill cannot be empty',
        type: 'required'
      })
    }
    else{
      const {images, ...payload} = data
      const response = await apiCreateNewPropertyType({...payload, image: images[0]})
      if(response?.success){
        toast.success('Create new property type successfully')
        reset()
        getImages([])
      }
      else{
        toast.error('Create new property type failed')
      }
    }
  }
  
  const getImages = (images) => {
    if(images && images.length > 0){
      clearErrors('images')
    }
    setValue(
      'images',
      images?.map(el => el?.path)
    )
  }
  return (
    <div className=''>
      <Title title='Create New Property Type'>
        <Button onClick={handleSubmit(handleSubmitForm)}>
          <CiSquarePlus color='white' size={20}/>
          <span className='font-semibold'>Create</span>
        </Button>
      </Title>
      <form className='p-4 flex flex-col gap-4'>
        <InputForm 
          id='name' 
          register={register}
          errors={errors}
          validate={{required: 'This fill cannot be empty'}}
          label='Property Type Name'
        />

        <TextArea
          id='description'
          register={register}
          errors={errors}
          label='Description'
          validate={{required: 'This fill cannot be empty'}}
         />

        <InputFile
          id='images'
          register={register}
          errors={errors}
          label='Image'
          validate={{required: 'This fill cannot be empty'}}
          getImage={getImages}
         />
      </form>
    </div>
  )
}

export default CreatePropertyType