import React, { useEffect } from 'react'
import { AboutUs, Home, OurAgents, Properties, PublicLayout, Search } from './pages/public'
import path from './utils/path'
import { Route, Routes } from 'react-router-dom'
import { Modal } from './components'
import { useAppStore } from './store/useAppStore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserStore } from './store/useUserStore'

const App = () => {
  const {isShowModal} = useAppStore()
  const {getCurrent, current, token} = useUserStore()
  useEffect(() => {
    getCurrent()
  }, [token])
  console.log(current)
  //
  return (
    <>
    {isShowModal && <Modal />}
    <Routes>
      <Route path={path.PUBLIC_LAYOUT} element={<PublicLayout />}>
        <Route path={path.HOME} element={<Home />}/>
        <Route path={path.ABOUT_US} element={<AboutUs />}/>
        <Route path={path.PROPERTIES} element={<Properties />}/>
        <Route path={path.OUR_AGENTS} element={<OurAgents />}/>
        <Route path={path.SEARCH} element={<Search />}/>
      </Route>
    </Routes>
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