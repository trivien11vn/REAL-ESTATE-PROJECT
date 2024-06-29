import React, { Fragment, useEffect, useRef, useState } from 'react'
import { CiMail } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import withRouter from 'src/hocs/withRouter';
import { useUserStore } from 'src/store/useUserStore';
import { showOption } from 'src/utils/constant';
import { Link } from 'react-router-dom';
const TopHeader = ({location}) => {
  const {current, logout} = useUserStore()
  const [isShowOptions, setIsShowOptions] = useState(false)
  const optionBox = useRef()
  useEffect(() => {
    const handleOnClick = (e) => {
      if(optionBox.current){
        if(optionBox.current.contains(e?.target)){
          setIsShowOptions(true)
        }
        else{
          setIsShowOptions(false)
        }
      }
    }

    document.addEventListener('click', handleOnClick)
    return () => { 
      document.removeEventListener('click', handleOnClick)
    }
  }, [])
  

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
        {
          current && 
          <div ref={optionBox} onClick={() => setIsShowOptions(true)} className='flex items-center cursor-pointer hover:bg-overlay-30 hover:rounded-md pl-4 border-l border-main-300 gap-2 relative'>
            <div className='flex flex-col gap-2'>
              <span>
                {current?.name}
              </span>
              <span>
                ID: #
                <span>{current?.id?.slice(0,6)}</span>
              </span>
            </div>
            <img className='w-12 h-12 object-cover rounded-full border border-main-500' alt='avatar' src={current?.avater || `/avatar.jpg`}></img>
            {
              isShowOptions && 
              <div className='absolute z-50 right-0 top-full rounded-md bg-white drop-shadow-sm flex flex-col py-2 border text-black'>
              {showOption?.map(el => (
                <Fragment key={el?.id}>
                  {current?.userRoles?.some(role => role?.roleCode === el?.code) && 
                  <Link className='px-6 py-2 hover:bg-gray-100' to={el?.path}>{el?.name}</Link>}
                </Fragment>
              ))}
              <span onClick={() => logout()} className='px-6 py-2 hover:bg-gray-100 cursor-pointer'>
                Logout
              </span>
              </div>
            }  
          </div>
        }
      </div>
    </div>
  )
}

export default withRouter(TopHeader)