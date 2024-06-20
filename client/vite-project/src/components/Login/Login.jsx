import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { Button, InputForm, InputRadio } from '..'
import { useForm } from 'react-hook-form'
import { apiRegister, apiSignin } from 'src/apis/auth'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import withRouter from 'src/hocs/withRouter'
import { useAppStore } from 'src/store/useAppStore'
import { useUserStore } from 'src/store/useUserStore'

const Login = ({location, navigate}) => {
  const [variant, setVariant] = useState('login')
  const [isLoading, setIsLoading] = useState(false)
  const {setModal} = useAppStore()
  const {token, setToken} = useUserStore()
  const {register, formState:{errors}, handleSubmit, reset} = useForm()
  
  const onSubmit = async(data) => {
    if(variant === 'signup'){
      setIsLoading(true)
      const response = await apiRegister(data)
      setIsLoading(false)
      if(response?.success){
        Swal.fire({
          icon: 'success',
          title: 'Congratulations! You have successfully registered',
          text: response.mes,
          showConfirmButton: true,
          confirmButtonText: 'Go to sign in'
        }).then(({isConfirmed}) => { 
            if(isConfirmed) setVariant('login')
         })
      }
      else{
        toast.error(response.mes)
      }
    }
    else if(variant === 'login'){
      const {name, role, ...payload} = data
      const response = await apiSignin(payload)
      if(response?.success){
        toast.success(response.mes)

        // Save token to local storage
        setToken(response.accessToken)
        setModal(false, null)
      }
      else{
        toast.error(response.mes)
      }
    }
    
  }

  useEffect(() => {
    reset()
  }, [variant])
  
  console.log(token)
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
          validate={{
            required: 'Please enter a valid phone number',
            pattern: {
              value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
              message: 'Phone number is invalid'
            }
          }}
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
        id='name' 
        placeholder='Type your full name'
        errors={errors} 
        validate={{required: 'This field cannot be empty'}}
        />
        }
        {variant === 'signup' &&
        <InputRadio 
          label='Type account' 
          register={register} 
          id='role' 
          validate={{required: 'This field cannot be empty'}}
          errors={errors} 
          options={[
            {label: 'User', value: 'USER'},
            {label: 'Agent', value: 'AGENT'}
          ]}
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

export default withRouter(Login)
