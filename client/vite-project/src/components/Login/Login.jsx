import clsx from 'clsx'
import React, { useState } from 'react'
import { Button, InputForm } from '..'
import { useForm } from 'react-hook-form'

const Login = () => {
  const [variant, setVariant] = useState('login')
  const {register, formState:{errors}, handleSubmit} = useForm()
  return (
    <div onClick={(e)=>e.stopPropagation()} 
        className='bg-white rounded-md px-6 py-8 flex flex-col items-center gap-6 w-[500px] text-lg'>
      <h1 className='text-5xl font-dancing_script font-semibold text-main-700'>Welcome to Tvien1411</h1>
      <div className='flex justify-start w-full gap-6 border-b '>
        <span onClick={()=> setVariant('login')} className={clsx(variant==='login'&& 'border-b-4 border-main-700', 'cursor-pointer')}>Sign in</span>
        <span onClick={()=> setVariant('singup')} className={clsx(variant==='singup'&& 'border-b-4 border-main-700', 'cursor-pointer')}>New account</span>
      </div>
      <div className='flex flex-col gap-4 w-full px-4'>
        <InputForm label='Phone Number' inputClassname='rounded-md' register={register} id='phone' placeholder='Type your phone number'/>
        <InputForm label='Password' inputClassname='rounded-md' register={register} id='password' placeholder='Type your password' type='password'/>
        <Button className='py-2 my-6'>{
          variant==='login'?'Sign in':'Sign Up'
        }</Button>
      </div>
    </div>
  )
}

export default Login
