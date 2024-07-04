import React, { useEffect } from 'react'
import { Login } from 'src/components'
import withRouter from 'src/hocs/withRouter'
import { useAppStore } from 'src/store/useAppStore'
import { useUserStore } from 'src/store/useUserStore'
import path from 'src/utils/path'
import Swal from 'sweetalert2'

const UserLayout = ({navigate, location}) => {
  const {current} = useUserStore()
  const {setModal} = useAppStore()
  console.log(current)
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
        console.log(response)
        if(response.isConfirmed){
          console.log('aa')
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
      <div>
        User Layout
      </div>
    }
    </>
  )
}

export default withRouter(UserLayout)