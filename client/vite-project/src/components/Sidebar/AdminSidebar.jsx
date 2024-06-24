import clsx from 'clsx'
import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { adminSidebar } from 'src/utils/constant'
import { IoMdArrowDropright } from "react-icons/io";

const AdminSidebar = () => {
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
                  <NavLink className={({isActive})=> clsx('flex items-center gap-2 hover:bg-main-700 hover:border-r-4 border-orange-700 px-4 py-3', isActive && 'bg-main-700 border-r-4')}>
                    <span className='text-2xl'>
                    {el?.icon}
                    </span>
                    <span>
                    {el?.name}
                    </span>
                  </NavLink>}

                  {el?.type === 'PARENT' && 
                  (
                    <>
                    <div className='flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-main-700'>
                      <span className='flex items-center gap-2'>
                        <span className='text-2xl'>
                          {el?.icon}
                        </span>
                        <span>
                          {el?.name}
                        </span>
                      </span>
                      <span className='text-2xl'>
                        <IoMdArrowDropright />
                      </span>
                    </div>

                    <div className=''>
                      {el.subs.map(sub => (
                        <NavLink key={sub?.id} className={({isActive})=> clsx('flex items-center gap-2 hover:bg-main-700 hover:border-r-4 border-orange-700 px-4 py-3', isActive && 'bg-main-700 border-r-4')}>
                          <span>
                          {sub?.name}
                          </span>
                        </NavLink>
                      ))}
                    </div>
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