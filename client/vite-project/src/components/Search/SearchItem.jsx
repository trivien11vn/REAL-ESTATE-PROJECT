import React from 'react'

const SearchItem = ({title, children}) => {
  return (
    <div className='relative flex flex-col gap-2 justify-center items-center border-r'>
        <h3 className='font-bold text-main-700 '>
            {title}
        </h3>
        {children}
    </div>
  )
}

export default SearchItem