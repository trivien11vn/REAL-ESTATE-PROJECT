import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import { Button } from '..';

const OTPVerifier = ({phone, cb}) => {
    const [otp, setOtp] = useState('');

    const [isLoading, setIsLoading] = useState(false)
    const handleConfirmOTP = () => { 
      setIsLoading(true)
      window.confirmationResult.confirm(otp).then(result => {
        setIsLoading(false)
        cb()
      }).catch(err => {
        setIsLoading(false)
      })
    }
  return (
    <div className='p-4 flex flex-col items-center justify-center h-full gap-12'>
    <span>
    We have sent the OTP code to your phone number <span>{phone}</span>
    </span>

    <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={6}
      renderSeparator={<span className='text-main-600 text-xl'> ● </span>}
      renderInput={(props) => <input {...props} />}
      inputStyle='h-16 otp-item border rounded-md outline-none inline-block border-main-600 text-lg mx-2'
      shouldAutoFocus
    />
    <div className='flex gap-4 justify-center items-center'>
      <Button disabled={isLoading} onClick={handleConfirmOTP}>Confirm OTP</Button>
      <Button onClick={() => setOtp('')} className='bg-orange-600'>Clear</Button>
    </div>
    </div>
  )
}

export default OTPVerifier