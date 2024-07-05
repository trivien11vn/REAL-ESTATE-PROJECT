import { Carousel } from 'nuka-carousel';
const ImageDetail = ({ images = [], count = 1, slideToShow = 1, slideToScroll = 1 }) => {
  return (
    <div className='flex flex-col items-center' onClick={(e)=>e.stopPropagation()}>
        <Carousel scrollDistance='screen' showArrows className="border-8 border-pink-500 border-solid mx-auto w-[600px]">
        {images.map((img, idx) => (
            <img key={idx} src={img} alt='picutre' />
        ))}
        </Carousel>
    </div>
  );
};

export default ImageDetail;
