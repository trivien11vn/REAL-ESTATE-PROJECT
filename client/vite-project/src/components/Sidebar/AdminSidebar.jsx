import clsx from 'clsx'
import React, { Fragment, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { adminSidebar } from 'src/utils/constant'
import { IoMdArrowDropright } from "react-icons/io";

const AdminSidebar = () => {
  const [tabs, setTabs] = useState([])
  const handleActiveTab = (id) => {
    if(tabs.some(el => el === id)){
      setTabs(prev => prev.filter(el => el !== id))
    }
    else{
      setTabs(prev => [...prev, id])
    }
  }
  return (
    <div className='h-screen w-full'>
        <div className='w-full flex flex-col items-center justify-center gap-2 p-4'>
            <img src='/logo-2.png' alt='logo' className='w-2/5 object-contain'></img>
            <small className='text-gray-200 italic'>
                Admin Workspace
            </small>
        </div>
        <div className='mt-6'>
            {
              adminSidebar.map(el => (
                <Fragment key={el?.id}>
                  {el?.type === 'SINGLE' && 
                  <NavLink to={el?.path} className={({isActive})=> clsx('flex items-center gap-2 hover:bg-main-700 hover:border-r-4 border-orange-700 px-4 py-3', isActive && 'bg-main-700 border-r-4')}>
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
                    <div onClick={() => handleActiveTab(el?.id)} className='flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-main-700'>
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
                        <NavLink to={sub?.path} key={sub?.id} className={({isActive})=> clsx('flex items-center gap-2 hover:bg-main-700 hover:border-r-4 border-orange-700 px-4 py-3', isActive && 'bg-main-700 border-r-4')}>
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
                </Fragment>
              ))
            }
        </div>
    </div>
  )
}

export default AdminSidebar