import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { apiGetProperty } from 'src/apis/property'
import { BreadCrumb, Button, InputSelect, Pagination, PropertyCard, Search } from 'src/components'
import { twMerge } from 'tailwind-merge'
import { CiBoxList } from "react-icons/ci";
import { useAppStore } from 'src/store/useAppStore'
import withRouter from 'src/hocs/withRouter'

const Properties = ({navigate, location}) => {
  //trong useeffect ko duoc goi bat dong bo
  const [mode, setMode ] = useState('ALL')
  const [properties, setProperties] = useState()
  const {register, formState:{errors}, watch} = useForm()
  const sort = watch('sort')
  const [searchParams] = useSearchParams()
  const {setModal} = useAppStore()

  useEffect(() => {
    const fetchProperties = async(params) => { 
      const response = await apiGetProperty({
        limit: 9,
        ...params
      })
      if(response?.success){
        setProperties(response?.property)
      }
      else{
        toast.error(response?.mes)
      }
    }
    const params = Object.fromEntries([...searchParams])
    if(params.price){
      params.price = searchParams.getAll('price')
    }
    if(sort){
      params.sort = sort
    }
    fetchProperties(params)
  }, [searchParams, sort])
  
  return (
    <div className='w-full'>
      <div className='relative w-full'>
        <img src='/Rectangle 25.png' alt='' className='w-full object-contain'/>
        <div className='absolute inset-0 text-white items-center justify-center flex flex-col '>
          <h1 className='text-[48px] font-medium'>Properties</h1>
          <div>
            <BreadCrumb />
          </div>
        </div>
      </div>
      <div className='w-main mx-auto my-24'>
        <div className='my-4 flex justify-between text-base items-center'>
          <div className='flex items-center gap-4'>
            <span onClick={() => setModal(true, <Search direction='vertical'/>)} className='cursor-pointer'>
              <CiBoxList size={24}/>
            </span>
            <InputSelect 
              register={register}
              id='sort'
              errors={errors}
              options={[
                {code: '-createdAt', label: 'Lastest'},
                {code: 'createdAt', label: 'Oldest'},
                {code: 'name', label: 'A - Z'},
                {code: '-name', label: 'Z - A'}
              ]}
              inputClassname='w-fit rounded-md'
              label='Sort by: '
              placeholder= 'Select sort type'
              containerClassname='flex-row  items-center'
            />
            <Button onClick={() => navigate(location.pathname)} className='whitespace-nowrap'>
              Reset
            </Button>
          </div>
          <div className='flex gap-2 items-center'>
            <Button onClick={()=> setMode('ALL')} className={twMerge(clsx('whitespace-nowrap bg-transparent text-black font-medium', mode === 'ALL' && 'font-bold'))}>All properties</Button>
            <Button onClick={()=> setMode('SALE')} className={twMerge(clsx('whitespace-nowrap bg-transparent text-black font-medium',  mode === 'SALE' && 'font-bold'))}>For sale</Button>
            <Button onClick={()=> setMode('RENT')} className={twMerge(clsx('whitespace-nowrap bg-transparent text-black font-medium',  mode === 'RENT' && 'font-bold'))}>For rent</Button>
          </div>
        </div>
        <div className='w-full grid grid-cols-3 gap-4'>
          {
            properties?.rows?.map(el => (
              <PropertyCard key={el?.id} property={el}/>
            ))
          }
        </div>

        <div className='flex items-center justify-center my-4'>
          <Pagination 
            total={properties?.count}
            limit={properties?.limit}
            page={properties?.page}
          />
        </div>
      </div>
    </div>
  )
}

export default withRouter(Properties)