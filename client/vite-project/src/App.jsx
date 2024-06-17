import React from 'react'
import { Home, PublicLayout } from './pages/public'
import path from './utils/path'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div className='text-gray-800 text-5xl'>
    <Routes>
      <Route path={path.PUBLIC_LAYOUT} element={<PublicLayout />}>
        <Route path={path.HOME} element={<Home />}/>
      </Route>
    </Routes>
    </div>
  )
}

export default App