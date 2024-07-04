import clsx from 'clsx'
import React, { Fragment, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { userSidebar } from 'src/utils/constant'
import { IoMdArrowDropright } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { useUserStore } from 'src/store/useUserStore';
import { FaPhoneAlt } from "react-icons/fa";
const UserSidebar = () => {
  const [tabs, setTabs] = useState([])
  const {current} = useUserStore()
  const handleActiveTab = (id) => {
    if(tabs.some(el => el === id)){
      setTabs(prev => prev.filter(el => el !== id))
    }
    else{
      setTabs(prev => [...prev, id])
    }
  }
  console.log(current)
  return (
    <div className='h-full bg-main-700 text-white w-full'>
        <div className='w-full flex flex-col items-center justify-center gap-2 p-4'>
          <img src={current?.avatar||`/avatar.jpg`} alt='logo' className='w-20 h-20 object-cover rounded-full'></img>
          <span className='text-lg font-bold text-orange-500'>{current?.name}</span>
          <span className='text-green-500 flex gap-2 items-center'>
            <span className='text-sm'> <FaPhoneAlt /></span>
            <span>{current?.phone}</span>
          </span>
          <span className='text-sm text-yellow-400 font-semibold'>{`(${current?.userRoles?.map(el => el?.roleName?.value)?.join('/ ')})`}</span>
        </div>
        <div className='mt-6'>
            {
              userSidebar.map(el => (
                <Fragment key={el?.id}>
                  {el?.type === 'SINGLE' && 
                  <NavLink to={el?.path} className={({isActive})=> clsx('flex items-center gap-2 hover:bg-main-600 hover:border-r-4 border-orange-700 px-4 py-3', isActive && 'bg-main-600 border-r-4')}>
                    <span className='text-2xl'>
                    {el?.icon}
                    </span>
                    <span className='select-none'>
                    {el?.name}
                    </span>
                  </NavLink>}

                  {el?.type === 'PARENT' && 
                  (
                    <>
                    <div onClick={() => handleActiveTab(el?.id)} className='flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-main-600'>
                      <span className='flex items-center gap-2'>
                        <span className='text-2xl'>
                          {el?.icon}
                        </span>
                        <span className='select-none'>
                          {el?.name}
                        </span>
                      </span>
                      {tabs.some(tab => tab === el.id) ? 
                      <IoMdArrowDropright className='text-2xl transform rotate-90'/> :
                      <IoMdArrowDropright className='text-2xl'/>}
                    </div>

                    {
                      tabs.some(tab => tab === el.id) && <div className=''>
                      {el.subs.map(sub => (
                        <NavLink to={sub?.path} key={sub?.id} className={({isActive})=> clsx('flex items-center gap-2 hover:bg-main-600 hover:border-r-4 border-orange-700 px-4 py-3', isActive && 'bg-main-600 border-r-4')}>
                          <span className='select-none'>
                          {sub?.name}
                          </span>
                        </NavLink>
                      ))}
                    </div>
                    }
                    </>
                  )
                  }
                
              <Link to={'/'} className={clsx('flex items-center gap-2 hover:bg-main-600 hover:border-r-4 border-orange-700 px-4 py-3')}>
                <span className='text-2xl'>
                <FaHome />
                </span>
                <span className='select-none'>
                  Home
                </span>
              </Link>
                </Fragment>
              ))
            }
        </div>
    </div>
  )
}

export default UserSidebar