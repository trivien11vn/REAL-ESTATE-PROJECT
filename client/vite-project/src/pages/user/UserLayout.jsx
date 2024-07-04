import React, { useEffect } from 'react'
import { Login, UserSidebar } from 'src/components'
import withRouter from 'src/hocs/withRouter'
import { useAppStore } from 'src/store/useAppStore'
import { useUserStore } from 'src/store/useUserStore'
import path from 'src/utils/path'
import Swal from 'sweetalert2'
import Personal from './Personal'
import { Outlet } from 'react-router-dom'

const UserLayout = ({navigate, location}) => {
  const {current} = useUserStore()
  const {setModal} = useAppStore()
  useEffect(() => {
    if(!current || !current?.userRoles?.some(el => el.roleCode === '4')){
      Swal.fire({
        icon: 'info',
        title: 'You are not allowed to access this page',
        text: 'Please login with the correct account',
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Login',
        cancelButtonColor: 'orange',
        confirmButtonColor: 'green',
      }).then((response) => { 
        if(response.isConfirmed){
          setModal(true, <Login />)
        }
        else if (response.dismiss === Swal.DismissReason.cancel) {
          // Thêm đoạn này để điều hướng khi nhấn nút "Cancel"
          window.location.href = '/';
        }
      })
    }
  }, [current])
  
  return (
    <>
    {
      current?.userRoles?.some(el => el.roleCode === '4') && 
      <div className='w-full grid grid-cols-12 min-h-screen max-h-screen overflow-y-auto'>
        <div className='col-span-2'><UserSidebar /></div>
        <div className='col-span-10'><Outlet /></div>
      </div>
    }
    </>
  )
}

export default withRouter(UserLayout)