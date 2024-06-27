import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import { Button } from '..';

const OTPVerifier = ({phone}) => {
    const [otp, setOtp] = useState('');
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
    <Button>Confirm OTP</Button>
    </div>
  )
}

export default OTPVerifier