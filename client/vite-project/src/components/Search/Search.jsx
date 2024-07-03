import React, { useState } from 'react'
import { Button, InputForm, InputSelect, SearchItem, SelectLibrary } from '..'
import { useForm } from 'react-hook-form'
import { usePropertiesStore } from 'src/store/usePropertiesStore'
import { FaAngleDown } from "react-icons/fa";
import withRouter from 'src/hocs/withRouter';
import path from 'src/utils/path';
import { createSearchParams } from 'react-router-dom';

const Search = ({navigate, location}) => {
    const {propertyType} = usePropertiesStore()
    const {register, formState: {errors}, handleSubmit, setValue} = useForm()
    
    const [isShowPrice, setIsShowPrice] = useState(false)
    const handleSearchParam = (data) => {
        console.log(data)
        const payload = new Object()
        if(data?.address){
            payload.address = data?.address.toString()
        }
        if(data?.propertyType){
            payload.propertyTypeId = data?.propertyType?.id
        }
        if(data?.start && !data?.end){
            payload.price = [+data?.start, Math.pow(10,9)]
        }
        if(data?.end && !data?.start){
            payload.price = [0, +data?.end]
        }
        if(data?.start && data?.end){
            payload.price = [data?.start, data?.end]
        }
        navigate({
            pathname: `/${path.PROPERTIES}`,
            search: createSearchParams(payload).toString()
        })
    }
  return (
    <form className='bg-white py-8 grid grid-cols-4 rounded-md shadow-lg w-[1096px] mx-auto h-[8em] mt-[-4em] relative z-20'>
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
            <SelectLibrary 
                id='propertyType' 
                register={register} 
                errors={errors} 
                containerClassname= 'w-[12em]'
                inputClassname='rounded-md border border-gray-200'
                placeholder='Select property type'
                options={propertyType?.map(el => ({...el, label: el?.name}))}
                onChange={(val) => setValue('propertyType', val)}
            />
        </SearchItem>
        <SearchItem title='Rent Range'>
            {isShowPrice && <div className='absolute top-full right-0 left-0 bg-white drop-shadow p-4 rounded-md border w-full flex flex-col gap-6'>
                <div className='flex flex-col gap-2'>
                    <span className='font-medium'>Type a price</span>
                    <div className='grid grid-cols-2 gap-3'>
                        <InputForm 
                            id='start' 
                            register={register} 
                            errors={errors} 
                        />
                        <InputForm 
                            id='end' 
                            register={register} 
                            errors={errors} 
                        />
                    </div>
                </div>
                {/* <div className='flex flex-col gap-2'>
                    <span className='font-medium'>Choose a price</span>
                    <input className='w-full' type='range' id='priceRange' {...register('priceRange')}></input>
                </div> */}
            </div>}
            <Button onClick={()=>setIsShowPrice(prev => !prev)} className='bg-white text-black border border-gray-300 w-full max-w-[196px]'>
                <span>Select price</span>
                <FaAngleDown />
            </Button>
        </SearchItem>
        <div className='flex items-center justify-center'>
            <Button onClick={handleSubmit(handleSearchParam)} className='px-8'>Search</Button>
        </div>
    </form>
  )
}

export default withRouter(Search)