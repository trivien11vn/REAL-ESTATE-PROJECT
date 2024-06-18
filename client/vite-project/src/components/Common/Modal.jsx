import React from 'react'
import { useAppStore } from 'src/store/useAppStore'

const Modal = () => {
  const {contentModal} = useAppStore()
  return (
    <div className='absolute top-0 left-0 w-screen h-screen bg-overlay-50 z-[1000]'>Modal</div>
  )
}

export default Modal