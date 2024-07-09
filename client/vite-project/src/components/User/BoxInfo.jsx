import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const BoxInfo = ({data, containerClassName, role, roleStyle}) => {
  return (
    <div className={twMerge(clsx('w-full bg-white border border-main-700 p-4 flex flex-col justify-center gap-2 items-center', containerClassName))}>
        <img src={data?.avatar} alt='avatar' className='w-24 h-24 object-cover rounded-full' />
        <h1 className='font-bold text-main-700 text-lg mt-4'>{data?.name}</h1>
        <span className={clsx('text-sm italic', roleStyle)}>{role}</span>
        <a className='px-6 py-2 bg-main-700 text-white rounded-md font-semibold' href={`tel:${data?.phone}`}>{data?.phone}</a>
    </div>
  )
}

export default BoxInfo