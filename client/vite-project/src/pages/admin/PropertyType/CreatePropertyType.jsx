import React from 'react'
import { Button, InputFile, InputForm, InputText, TextArea, Title } from 'src/components'
import { CiSquarePlus } from "react-icons/ci";
import { useForm } from 'react-hook-form';

const CreatePropertyType = () => {
  const {register, formState: {errors}, handleSubmit, reset, setValue} = useForm()
  const handleSubmitForm = (data) => {
    console.log(data)
  }
  return (
    <div className=''>
      <Title title='Create New Property Type'>
        <Button onClick={handleSubmit(handleSubmitForm)}>
          <CiSquarePlus size={20}/>
          <span>Create</span>
        </Button>
      </Title>
      <form className='p-4 flex flex-col gap-4'>
        <InputForm 
          id='name' 
          register={register}
          errors={errors}
          validate={{required: 'This fill cannot empty'}}
          label='Property Type Name'
        />

        <TextArea
          id='description'
          register={register}
          errors={errors}
          label='Description'
          validate={{required: 'This fill cannot empty'}}
         />

        <InputFile
          id='image'
          register={register}
          errors={errors}
          label='Image'
          validate={{required: 'This fill cannot empty'}}
         />
      </form>
    </div>
  )
}

export default CreatePropertyType