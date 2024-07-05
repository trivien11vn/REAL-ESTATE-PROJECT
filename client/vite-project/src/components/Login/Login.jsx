import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { Button, InputForm, InputRadio, OTPVerifier } from '..'
import { useForm } from 'react-hook-form'
import { apiRegister, apiSignin } from 'src/apis/auth'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import withRouter from 'src/hocs/withRouter'
import { useAppStore } from 'src/store/useAppStore'
import { useUserStore } from 'src/store/useUserStore'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import auth from 'src/utils/firebaseConfig'
import { twMerge } from 'tailwind-merge'

const Login = ({location, navigate}) => {
  const [variant, setVariant] = useState('login')
  const [isLoading, setIsLoading] = useState(false)
  const {setModal} = useAppStore()
  const {token, setToken, roles} = useUserStore()

  const [isShowOTP, setIsShowOTP] = useState(false)
  const {register, formState:{errors}, handleSubmit, reset} = useForm()
  
  //Create capcha
  const handleCapcha = () => {
    if(!window.recapchaVerify){
      window.recapchaVerify = new RecaptchaVerifier(auth, 'recapcha-verifier', 
        {
        size: 'invisible',
        callback: response => {
        },
        'expired-callback': (response) => {
        }
        })
    }
  }
  const sendOtp = (phoneNumber) => {
    setIsLoading(true)
    handleCapcha()
    const verifier = window.recapchaVerify
    const formatPhone = '+84' + phoneNumber.slice(1)
    signInWithPhoneNumber(auth, formatPhone, verifier)
    .then((result) => {
      setIsLoading(false)
      toast.success('OTP code has been sent to your phone number')
      window.confirmationResult = result
      setIsShowOTP(true)
    }).catch((error) => {
      setIsLoading(false)
      toast.error('Something went wrong')
      window.isSentOTP = false
    });
  }
  const onSubmit = async(data) => {
    if(variant === 'signup'){
      if(data?.roleCode !== '4'){
        sendOtp(data?.phone)
      }
      else{
        const {roleCode, ...payload} = data
        console.log(data)
        console.log(payload)
        setIsLoading(true)
        const response = await apiRegister(payload)
        setIsLoading(false)
        if(response?.success){
          Swal.fire({
            icon: 'success',
            title: 'Congratulations! You have successfully registered',
            text: response.mes,
            showConfirmButton: true,
            confirmButtonText: 'Go to sign in'
          }).then(({isConfirmed}) => { 
              if(isConfirmed) {
                setVariant('login')
                setIsShowOTP(false)
              }
            })
        }
        else{
          toast.error(response.mes)
        }
      }
    }
    else if(variant === 'login'){
      const {name, roleCode, ...payload} = data
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

  const handleRegister = async(data) => {
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
          if(isConfirmed) {
            setVariant('login')
            setIsShowOTP(false)
          }
        })
    }
    else{
      toast.error(response.mes)
    }
  }
  
  return (
    <div onClick={(e)=>e.stopPropagation()} 
        className={twMerge(clsx('bg-white relative rounded-md px-6 py-8 flex flex-col items-center gap-6 w-[550px] text-lg', isShowOTP && 'w-[600px] h-[350px]'))}>
         {isShowOTP &&
          <div className='absolute inset-0 bg-white rounded-md'>
            <OTPVerifier cb = {handleSubmit(handleRegister)} />
          </div>
         }
      <h1 className='text-5xl font-agbalumo font-semibold text-main-700'>Welcome to Tvien1411</h1>
      <div className={twMerge(clsx('flex justify-start w-full gap-6 border-b', isShowOTP && 'hidden'))}>
        <span onClick={()=> setVariant('login')} className={clsx(variant==='login'&& 'border-b-4 border-main-700', 'cursor-pointer')}>Sign in</span>
        <span onClick={()=> setVariant('signup')} className={clsx(variant==='signup'&& 'border-b-4 border-main-700', 'cursor-pointer')}>New account</span>
        <div id='recapcha-verifier'></div>
      </div>
      <form className={twMerge(clsx('flex flex-col gap-4 w-full px-4', isShowOTP && 'hidden'))}>
        <InputForm 
          label='Phone Number' 
          inputClassname='rounded-md' 
          register={register} 
          id='phone' 
          placeholder='Type your phone number'
          validate={{
            required: 'Please enter a valid phone number',
            // pattern: {
            //   value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
            //   message: 'Phone number is invalid'
            // }
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
          id='roleCode' 
          validate={{required: 'This field cannot be empty'}}
          errors={errors} 
          options={roles?.filter?.(el=>el.code !== '1').map(ell => (
            {label: ell?.value,
             value: ell?.code}
          ))}
          optionClassname='grid grid-cols-3 gap-4'
        />
        }
        <Button disabled={isLoading} onClick={handleSubmit(onSubmit)} className='py-2 my-6'>{
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
