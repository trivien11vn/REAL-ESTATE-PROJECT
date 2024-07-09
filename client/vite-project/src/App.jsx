import React, { useEffect } from 'react'
import { Modal } from './components'
import { useAppStore } from './store/useAppStore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserStore } from './store/useUserStore'
import { usePropertiesStore } from './store/usePropertiesStore'
import { Outlet } from 'react-router-dom';
import clsx from 'clsx';

const App = () => {
  const {isShowModal} = useAppStore()
  const {getCurrent, current, token, getRoles} = useUserStore()
  const {getPropertyTypes} = usePropertiesStore()
  useEffect(() => {
    getCurrent()
    getRoles()
    getPropertyTypes({
      fields: 'id,name,image'
    })
  }, [token])
  
  
  //
  return (
    <>
    {isShowModal && <Modal />}
    <div
    className={clsx(isShowModal ? 'max-h-screen overflow-hidden' : 'max-h-full overflow-auto')}
    >
    <Outlet />
    </div>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
    </>
  )
}

export default App