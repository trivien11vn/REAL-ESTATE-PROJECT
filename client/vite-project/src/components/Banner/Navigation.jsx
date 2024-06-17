import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from '../Common/Button'
import { navigation } from 'src/utils/constant'
import clsx from 'clsx'
import withRouter from 'src/hocs/withRouter'
import { twMerge } from 'tailwind-merge'


const Navigation = ({location}) => {
  return (
    <div className={twMerge(
      clsx('h-[85px] w-full bg-transparent fixed top-[85px] z-50 px-[100px] py-[26px] flex items-center justify-between',
        location?.pathname !== '/' && 'bg-white')
    )}>
      <Link to='/'>
        <img src='/logo.png' alt='logo' className='w-[90px] object-contain'></img>
      </Link>
      <div className={clsx('flex items-center gap-6', location?.pathname !== '/' ? 'text-gray-700' : 'text-main-100')}>
        {navigation.map(el=>(
          <NavLink key={el?.id} to={el?.path} className={({isActive})=>clsx(isActive && 'font-medium', location?.pathname === '/' ? 'text-white' : 'text-gray-900')}>
            {el?.text}
          </NavLink>
        ))}
        <Button className={twMerge(
          clsx(location?.pathname === '/' && 'bg-transparent border-main-100 border')
        )}>
          Add Listing
        </Button>
      </div>
    </div>
  )
}

export default withRouter(Navigation)