import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const SearchItem = ({title, children, className}) => {
  return (
    <div className={twMerge(clsx('relative flex flex-col gap-2 justify-center items-center border-r', className))}>
        <h3 className='font-bold text-main-700 '>
            {title}
        </h3>
        {children}
    </div>
  )
}

export default SearchItem