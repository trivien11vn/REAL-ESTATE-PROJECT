import React from 'react'
import { Button, InputForm, InputText, Title } from 'src/components'
import { CiSquarePlus } from "react-icons/ci";
import { useForm } from 'react-hook-form';

const CreatePropertyType = () => {
  const {register, formState: {errors}, handleSubmit, reset, setValue} = useForm()
  return (
    <div className=''>
      <Title title='Create New Property Type'>
        <Button>
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

        <InputText
          id='description'
          register={register}
          errors={errors}
          setValue={setValue}
          label='Description'
          validate={{required: 'This fill cannot empty'}}
         />
      </form>
    </div>
  )
}

export default CreatePropertyType