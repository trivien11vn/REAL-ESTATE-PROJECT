import React from 'react'
import { CiMail } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import withRouter from 'src/hocs/withRouter';
const TopHeader = ({location}) => {
  return (
    <div className={twMerge(
      clsx('h-[85px] text-white w-full bg-transparent fixed z-50 top-0 px-[100px] py-[26px] flex items-center justify-between border-b border-main-400', 
          location.pathname !== '/' && 'bg-main-700'
          )
      )}>
      <span className='flex items-center gap-2'>
        <CiMail />
        <span>
          <span>Email us at :</span>
          <span className='text-gray-300'> example@mail.com</span>
        </span>
      </span>

      <div className='flex gap-6 items-center'>
        <div className='flex gap-6 items-center text-gray-300'>
          <FaFacebookF size={18}/>
          <FaInstagram size={18}/>
          <FaYoutube size={20}/>
        </div>
        <div className='flex items-center pl-4 border-l border-main-300'>
          <span className='flex items-center gap-2'>
            <FiPhone />
            <span className='text-gray-300'>123-456-7890</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default withRouter(TopHeader)