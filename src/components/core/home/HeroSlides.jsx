import React, { useState } from 'react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import slid1 from "../../../assets/slide-1.png"
import slid2 from "../../../assets/slide-2.png"
import slid3 from "../../../assets/slide-3.png"
import smSlid1 from "../../../assets/heroimg.png"
import smSlid2 from "../../../assets/add.jpeg"
import smSlid3 from "../../../assets/smSlide1.png"
import smSlid4 from "../../../assets/smSlide2.avif"




const HeroSlides = () => {
    const [viewport, setViewport] = useState(window.innerWidth);
    
    const handleResize = () => {
        setViewport(window.innerWidth)
    }
    
    window.addEventListener("resize",handleResize);

  return (
    <div className='w-11/12 mx-auto'>
    <div className='w-full '>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        spaceBetween={10}
        autoplay={{ delay: 2500 }}
        pagination={{ clickable: true }}
      >
      {
        viewport > 500 ?
        <div>
        <SwiperSlide><img src={slid1} className=' w-full h-auto object-cover ' alt='Slide 1' /></SwiperSlide>
         <SwiperSlide><img src={slid2} className='w-full h-auto object-cover' alt='Slide 2' /></SwiperSlide>
         <SwiperSlide><img src={slid3} className='w-full h-auto object-cover' alt='Slide 3' /></SwiperSlide>
         <SwiperSlide><img src={slid2} className='w-full h-auto object-cover' alt='Slide 4' /></SwiperSlide>
        </div>
        : <div className=''>
            <SwiperSlide><img src={smSlid1} className='w-full h-auto object-cover' alt='Slide 2' /></SwiperSlide>
            <SwiperSlide><img src={smSlid2} className='w-full h-auto object-cover' alt='Slide 3' /></SwiperSlide>
            <SwiperSlide><img src={smSlid3} className='w-full h-[330px] object-cover' alt='Slide 3' /></SwiperSlide>
            <SwiperSlide><img src={smSlid4} className='w-full h-auto object-cover' alt='Slide 3' /></SwiperSlide>
        </div>
      }
      </Swiper>
    </div>

    <div className='flex items-center justify-center flex-col py-5 sm:py-20 gap-5 '>
        <h1 className='sm:text-3xl text-xl font-semibold tracking-wide'>Cushioning for Your Miles</h1>
        <p className='text-center sm:w-[50%] sm:text-xl text-sm'>
          A lightweight Nike ZoomX midsole is combined with increased stack heights to help provide cushioning during extended stretches of running.
        </p>
      </div>

      
  </div>
  )
}

export default HeroSlides
