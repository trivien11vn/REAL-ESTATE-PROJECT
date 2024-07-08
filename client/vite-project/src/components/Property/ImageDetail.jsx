import clsx from 'clsx';
import Carousel from 'nuka-carousel';
import React, { useState } from 'react'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { twMerge } from 'tailwind-merge';
import { IoIosCloseCircle } from "react-icons/io";
import { useAppStore } from 'src/store/useAppStore';
const ImageDetail = ({ images = [], slideToShow = 1, slideToScroll = 1, forceIndex=0}) => {
  const [currentSlide, setCurrentSlide] = useState(() => forceIndex)
  const {setModal} = useAppStore()
  return (
    <div className='bg-overlay-90 w-screen h-screen' onClick={(e)=>e.stopPropagation()}>
      <div className='flex p-6 items-center justify-between'>
        <span className='text-white font-bold'>{`${currentSlide+1}/${images?.length}`}</span>
        <span className='p-2 cursor-pointer' onClick={()=>setModal(false, null)}><IoIosCloseCircle size={32} color='white'/></span>
      </div>
      <div className='flex items-center justify-center pb-40 h-full w-full'>
      <div className='h-fit w-[80vw]'>
          <Carousel 
            className='align-middle'
            slidesToScroll={slideToScroll} 
            slidesToShow={slideToShow}
            slideIndex={currentSlide}
            afterSlide={(idx)=> setCurrentSlide(idx)}
            renderCenterLeftControls={({previousSlide, previousDisabled})=>(<button onClick={previousSlide} className={twMerge(clsx('p-2 bg-gray-700 border shadow-md rounded-full ml-2', previousDisabled && 'hidden'))}><FaArrowAltCircleLeft size={22} color='white'/></button>)}
            renderCenterRightControls={({nextSlide, nextDisabled})=>(<button onClick={nextSlide} className={twMerge(clsx('p-2 bg-gray-700 border shadow-md rounded-full mr-2', nextDisabled && 'hidden'))}><FaArrowAltCircleRight size={22} color='white'/></button>)}
            renderBottomCenterControls={({currentSlide, goToSlide})=>(
              <div className='absolute top-[calc(100%+16px)] left-0 right-0'>
                <div className='flex items-center justify-center gap-1'>
                  {images?.map((el, idx) => (
                    <img 
                      onClick={()=> goToSlide(idx)} 
                      src={el} 
                      key={idx} 
                      alt='picture' 
                      className={twMerge(clsx('cursor-pointer h-20 object-contain rounded-md', currentSlide===idx && 'scale-110 mx-4'))}/>
                  ))}
                </div>
              </div>
            )}
          >
            {images?.map((el,idx) => (
              <img key={idx} src={el} alt='picture' className='max-w-[500px] object-contain mx-auto'></img>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ImageDetail;
