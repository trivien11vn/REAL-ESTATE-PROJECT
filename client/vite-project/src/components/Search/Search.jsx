import React, { useState } from 'react'
import { Button, InputForm, InputSelect, SearchItem, SelectLibrary } from '..'
import { useForm } from 'react-hook-form'
import { usePropertiesStore } from 'src/store/usePropertiesStore'
import { FaAngleDown } from "react-icons/fa";
import withRouter from 'src/hocs/withRouter';
import path from 'src/utils/path';
import { createSearchParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { useAppStore } from 'src/store/useAppStore';

const Search = ({navigate, location, direction='horizontal'}) => {
    const {setModal} = useAppStore()
    const {propertyType} = usePropertiesStore()
    const {register, formState: {errors}, handleSubmit, setValue} = useForm()
    
    const [isShowPrice, setIsShowPrice] = useState(false)
    const handleSearchParam = (data) => {
        const payload = new Object()
        if(data?.address){
            payload.address = data?.address.toString()
        }
        if(data?.propertyType){
            payload.propertyTypeId = data?.propertyType?.id
        }
        if(data?.start && !data?.end){
            payload.price = ['gte', +data?.start]
        }
        if(data?.end && !data?.start){
            payload.price = ['lte', +data?.end]
        }
        if(data?.start && data?.end){
            payload.price = [data?.start, data?.end]
        }

        if(direction === 'vertical'){
            setModal(false, null)
        }
        navigate({
            pathname: `/${path.PROPERTIES}`,
            search: createSearchParams(payload).toString()
        })
    }
  return (
    <form   className={twMerge(clsx('bg-white py-4 rounded-md shadow-lg mx-auto mt-[-4em] relative z-20', 
                        direction === 'vertical' ? 'flex flex-col gap-4 h-fit w-[512px] px-8' : '', 
                        direction === 'horizontal' ? 'grid grid-cols-4 h-[8em] w-[1096px]' : ''))}
            onClick={(e) => {e.stopPropagation()}}
    >
        <SearchItem className={direction === 'vertical' && 'items-start justify-start border-none'} title='Locations'>
            <InputForm 
                id='address' 
                register={register} 
                errors={errors} 
                placeholder='Select your city'
                containerClassname= {direction === 'horizontal' ? 'w-[12em]' : 'w-full'}
                inputClassname='rounded-md border border-gray-200'
            />
        </SearchItem>
        <SearchItem className={direction === 'vertical' && 'items-start justify-start border-none'} title='Property Type'>
            <SelectLibrary 
                id='propertyType' 
                register={register} 
                errors={errors} 
                containerClassname= {direction === 'horizontal' ? 'w-[12em]' : 'w-full'}
                inputClassname='rounded-md border border-gray-200'
                placeholder='Select property type'
                options={propertyType?.map(el => ({...el, label: el?.name}))}
                onChange={(val) => setValue('propertyType', val)}
            />
        </SearchItem>
        <SearchItem className={direction === 'vertical' && 'items-start justify-start border-none'}  title='Rent Range'>
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
            </div>}
            <Button onClick={()=>setIsShowPrice(prev => !prev)} className={twMerge(clsx('bg-white text-black border border-gray-300 w-full max-w-[12em]', direction === 'vertical' ? 'max-w-full hidden' : 'max-w-[12em]'))}>
                <span>Select price</span>
                <FaAngleDown />
            </Button>
            {
                direction === 'vertical' && 
                <div className='grid grid-cols-2 gap-3 w-full'>
                    <InputForm 
                        id='start' 
                        inputClassname='border-gray-200 rounded-md'
                        register={register} 
                        errors={errors} 
                        placeholder='Min price'
                    />
                    <InputForm 
                        id='end' 
                        inputClassname='border-gray-300 rounded-md'
                        register={register} 
                        errors={errors} 
                        placeholder='Max price'
                    />
                </div>
            }
        </SearchItem>
        <div className='flex items-center justify-center'>
            <Button onClick={handleSubmit(handleSearchParam)} className='px-8'>Search</Button>
        </div>
    </form>
  )
}

export default withRouter(Search)