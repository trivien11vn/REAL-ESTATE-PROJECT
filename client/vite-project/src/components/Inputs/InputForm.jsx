import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const InputForm = ({style = 'form-input', containerClassname, label, id, type='text', register, errors={}, inputClassname, validate, placeholder, require, readOnly}) => {
  return (
    <div className={twMerge(clsx('flex flex-col gap-2 w-full', containerClassname))}>
      {label && 
        <label className='font-medium text-main-700' htmlFor={id}>
          {label}
          {require && <sup className='text-red-600'>*</sup>}
        </label>}
      <input 
        type={type} 
        id={id} 
        className={twMerge(clsx(style, inputClassname, 'placeholder:text-sm', readOnly && 'bg-gray-200 select-none cursor-not-allowed focus:ring-0'))}
        {...register(id, validate)}  
        placeholder={placeholder}
        readOnly = {readOnly}
      />
      {errors[id] && <small className='italic text-red-500'>{errors[id]?.message}</small>}
    </div>
  )
}

export default InputForm