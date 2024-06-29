import React, { useEffect, useState } from 'react'
import { apiGetProperty } from 'src/apis/property'
import { BreadCrumb, PropertyCard } from 'src/components'

const Properties = () => {
  //trong useeffect ko duoc goi bat dong bo
  const [properties, setProperties] = useState()
  useEffect(() => {
    const fetchProperties = async() => { 
      const response = await apiGetProperty({limit: 9})
      console.log(response)
      if(response?.success){
        setProperties(response?.property?.rows)
      }
    }
    fetchProperties()
    console.log(properties)
  }, [])
  
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
        <div>
          sortBy
        </div>
        <div className='w-full grid grid-cols-3 gap-4'>
          {
            properties?.map(el => (
              <PropertyCard key={el?.id} property={el}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Properties