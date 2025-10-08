import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import HeroSlides from '../components/core/home/HeroSlides';
import Footer from '../components/common/Footer';
import { getAllCategories } from '../service/operation/category';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import SubCategoryCard from '../components/common/SubCategoryCard';
import RecentView from '../components/common/RecentView';


const Home = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const [categories, setCategories] = useState();
  const [viewport, setViewport] = useState(window.innerWidth);
  
    
    const handleResize = () => {
        setViewport(window.innerWidth)
    }
    
    window.addEventListener("resize",handleResize);

  const fetchAllCategory = () => {
    getAllCategories()
    .then((result) => {
      console.log(result,"this is category result home page")
      const categorys = result.data.filter((item) => item.subCategories
      .length > 0);
      setCategories(categorys);
    })

    console.log("calaling..")
  }

  

  useEffect(() => {
    fetchAllCategory();
  }, [])
  return (
    <div className='pt-3'>
      <HeroSlides />

      <div className='w-full  bg-slate-200 rounded-sm h-full'>
        <div className='w-11/12 mx-auto '>
          {
            !categories ? 
            <div className=' w-full h-full py-16 flex items-center justify-center text-black'>
              <div className='custom-loader '></div>
              </div>
            : <div className='w-full h-full flex flex-col gap-2 lg:gap-5'>
             {
            categories.map((category, index) => {
              return <div key={index}>
                <p className='text-xl font-semibold italic text-blue-500 my-3'>Best in {category.categoryName}</p>
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                  navigation
                  spaceBetween={10}
                  slidesPerView={ viewport < 500 ? 1.2 : 4}
                >
                  {
                    category.subCategories
                    .map((item,index) => (
                      <div key={index}>
                        <SwiperSlide>
                          <SubCategoryCard item={item} categoryId={category._id} />
                        </SwiperSlide>
                      </div>
                    ))
                  }
                </Swiper>
              </div>
            })
          }
            </div>
          }

<RecentView/>
        </div>
        
      </div>
      

    </div>
  )
}

export default Home
