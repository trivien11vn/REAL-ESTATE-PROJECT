import React from 'react'

const Login = () => {
  return (
    <div onClick={(e)=>e.stopPropagation()} className='bg-white rounded-md px-6 py-8 flex flex-col gap-6 '>
      <h1 className='text-5xl font-dancing_script font-semibold'>Welcome to Tvien1411</h1>
    </div>
  )
}

export default Login
