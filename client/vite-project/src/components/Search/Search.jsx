import React from 'react'
import { Button, InputForm, InputSelect, SearchItem } from '..'
import { useForm } from 'react-hook-form'

const Search = () => {
    const {register, formState: {errors}} = useForm()
  return (
    <div className='bg-white py-8 grid grid-cols-4 rounded-md shadow-lg w-[1096px] mx-auto h-[8em] mt-[-4em] relative z-20'>
        <SearchItem title='Locations'>
            <InputForm 
                id='address' 
                register={register} 
                errors={errors} 
                placeholder='Select your city'
                containerClassname= 'w-[12em]'
                inputClassname='rounded-md border border-gray-200'
            />
        </SearchItem>
        <SearchItem title='Property Type'>
            <InputSelect 
                id='propertyType' 
                register={register} 
                errors={errors} 
                containerClassname= 'w-[12em]'
                inputClassname='rounded-md border border-gray-200'
                placeholder='Select property type'
            />
        </SearchItem>
        <SearchItem title='Rent Range'>
            <InputSelect 
                    id='price' 
                    register={register} 
                    errors={errors} 
                    containerClassname= 'w-[12em]'
                    inputClassname='rounded-md border border-gray-200'
                    placeholder='Select rent range'
            />
        </SearchItem>
        <div className='flex items-center justify-center'>
            <Button className='px-8'>Search</Button>
        </div>
    </div>
  )
}

export default Search