import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { Button, InputForm } from '..'
import { useForm } from 'react-hook-form'

const Login = () => {
  const [variant, setVariant] = useState('login')
  const {register, formState:{errors}, handleSubmit, reset} = useForm()
  console.log(errors)
  const onSubmit = (data) => {
  }

  useEffect(() => {
    reset()
  }, [variant])
  
  return (
    <div onClick={(e)=>e.stopPropagation()} 
        className='bg-white rounded-md px-6 py-8 flex flex-col items-center gap-6 w-[550px] text-lg'>
      <h1 className='text-5xl font-agbalumo font-semibold text-main-700'>Welcome to Tvien1411</h1>
      <div className='flex justify-start w-full gap-6 border-b '>
        <span onClick={()=> setVariant('login')} className={clsx(variant==='login'&& 'border-b-4 border-main-700', 'cursor-pointer')}>Sign in</span>
        <span onClick={()=> setVariant('signup')} className={clsx(variant==='signup'&& 'border-b-4 border-main-700', 'cursor-pointer')}>New account</span>
      </div>
      <form className='flex flex-col gap-4 w-full px-4'>
        <InputForm 
          label='Phone Number' 
          inputClassname='rounded-md' 
          register={register} 
          id='phone' 
          placeholder='Type your phone number'
          validate={{required: 'Please enter a valid phone number'}}
          errors={errors}
          />
        <InputForm 
          label='Password' 
          inputClassname='rounded-md' 
          register={register} 
          id='password' 
          placeholder='Type your password' 
          type='password'
          validate={{required: 'Please enter a password'}}
          errors={errors}
          />
        {variant === 'signup' &&
        <InputForm 
        label='Your full name' 
        inputClassname='rounded-md' 
        register={register} 
        id='full_name' 
        placeholder='Type your full name'
        errors={errors} 
        />
        }
        <Button onClick={handleSubmit(onSubmit)} className='py-2 my-6'>{
          variant==='login'?'Sign in':'Sign Up'
        }</Button>
        <span className='cursor-pointer text-main-500 hover:underline w-full text-center'>
          Forgot your password?
        </span>
      </form>
    </div>
  )
}

export default Login
