    import React from 'react'
    import { useDispatch, useSelector } from 'react-redux'
    import ProductCard from './ProductCard';
    import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
    import { Swiper, SwiperSlide } from 'swiper/react';
    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';
    import 'swiper/css/autoplay';
    import useGetViewPort from '../../hook/useGetViewPort';

    const RecentView = () => {
        const {recentlyView} = useSelector((state) => state.profile);
        const viewport = useGetViewPort();
      

      return (
        <div>
          {
            recentlyView.length !== 0 && 
            <div>
              <p className='text-xl font-semibold italic text-blue-500 my-3'>Recent</p>

           <div  className='flex flex-row flex-wrap w-full lg:gap-5 gap-2 p-1'>


    <Swiper
      modules={[Navigation, Pagination, Scrollbar, Autoplay]}
      navigation
      spaceBetween={10}
      slidesPerView={ viewport < 500 ? 2.2 : 4}
    >
      {
        recentlyView
        .map((item,index) => (
          <div key={index}>
            <SwiperSlide>
            <ProductCard key={index} product={item}/>
            </SwiperSlide>
          </div>
        ))
      }ā
    </Swiper>

    </div>
            </div>
          }
              
        </div>
      )
    }

    export default RecentView
