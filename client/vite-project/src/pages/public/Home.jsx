import React from 'react'
import { Search } from 'src/components'
const Home = () => {
  return (
    <div className='bg-white w-full '>
      <div className='w-full h-fit relative'>
          <img src='/banner.png' alt='banner' className='w-full h-[752px] object-cover'/>
          <div className='absolute pt-12 inset-0 flex items-center justify-center flex-col gap-6'>
            <h1 className='text-5xl text-white'>Find Your Dream Home</h1>
            <span className='flex flex-col justify-center items-center'>
              <span className='text-white text-lg'>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere </span>
              <span className='text-white text-lg'>cubilia curae; Proin sodales ultrices nulla blandit volutpat.</span>
            </span>
          </div>
      </div>
      <Search />
      <div className='w-main mx-auto'>
        contain
      </div>
    </div>
  )
}

export default Home