import React from 'react'
import { BreadCrumb } from 'src/components'

const Properties = () => {
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
    </div>
  )
}

export default Properties