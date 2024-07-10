import React from 'react'
import { PropertyItem } from '..'

const RelatedProperty = ({title = '', data=[]}) => {
  console.log(data)
  return (
    <div className='w-full rounded-md h-fit flex flex-col'>
      <h1 className='font-bold rounded-md text-lg w-full h-12 flex items-center justify-center bg-main-300'>{title}</h1>
      <div className='flex flex-col'>
       {data?.map(el => (
        <PropertyItem key={el?.id} {...el}/>
       ))}
      </div>
    </div>
  )
}

export default RelatedProperty