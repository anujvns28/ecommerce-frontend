import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSignleProductInfo } from '../service/operation/product';
import { useSelector } from 'react-redux';
import ProductCard from '../components/common/ProductCard';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { CategoryInfo } from '../service/operation/category';
import SubCategoryCard from '../components/common/SubCategoryCard';

const SingleProduct = () => {
  
  const {productId} = useParams();
  const [productInfo,setProductInfo] = useState();
  const [imageIndex,setImageIndex] = useState(0);
  const {allProduct} = useSelector((state) => state.product);
  const [viewport, setViewport] = useState(window.innerWidth);
  const [category, setCategory] = useState();
  
    
    const handleResize = () => {
        setViewport(window.innerWidth)
    }
    
    window.addEventListener("resize",handleResize);

  const fetchproductInfo = async() => {
    const result = await getSignleProductInfo(productId);
    if(result){
      setProductInfo(result.data)
      const category = await CategoryInfo(result.data.category);
      if (category) {
        setCategory(category.data)
      }
    }
  }

 
  useEffect(() => {
  fetchproductInfo();
  },[productId])

  if(!productInfo){
    return <div className='w-screen h-screen flex items-center justify-center '>
       <div className='custom-loader'></div>
    </div>
  }
  return (
   <div className='w-full h-full '>
     <div className=' w-11/12 mx-auto '>
      <div className=' lg:w-[77%] w-[95%] mx-auto flex lg:flex-row  my-10 flex-col-reverse gap-[8%]'>
        <div className='flex lg:flex-row flex-col-reverse gap-2 lg:w-[48%]  w-full'>
          <div className='relative'>
            {
              productInfo ?
                <div
                  className='flex lg:flex-col  gap-2'>
                  {
                    productInfo.productsImages.map((item,index) => {
                      return <div className='w-20'>
                        <img onClick={() => setImageIndex(index)}
                          className='object-cover rounded-md lg:w-32 lg:h-20  h-16 cursor-pointer'
                          src={item} ></img >
                      </div>

                    })
                  }
                </div>
                : <div> Loading... </div>
            }
          </div>
          {/* gf */}
          <div className='w-full'>
            {
              productInfo ? <img className='object-cover  lg:h-[80vh] h-[300px] rounded-md'
                src={productInfo.productsImages[imageIndex]}></img> : "Loading..."
            }
          </div>
        </div>

        <div className=' lg:w-[40%] w-full p-3 flex flex-col lg:gap-2 '>
          <h1 className='lg:text-3xl text-xl font-semibold'>{productInfo ? productInfo.productName : "Loading..."}</h1>
          <p className='font-semibold '>{productInfo ? productInfo.forWhom : "Loading..."}'s Shoes</p>
          <div className='lg:pt-3 pt-1'>
            <p className='font-semibold text-lg'>MRP : {productInfo ? productInfo.price : "Loading..."}</p>
            <p className='text-slate-400'>incl. of taxes</p>
            <p className='text-slate-400'>(Also includes all applicable duties)</p>
          </div>
          <p className='font-semibold pb-2'>Color : {productInfo ? productInfo.color : "Loading..."}</p>

          <div className='lg:flex hidden flex-col gap-3'>
            <div className='flex flex-row gap-3'>
              <button 
                className='rounded-full text-xl px-2 py-4 w-[48%] bg-black  text-white'>
                Add to Cart
              </button>
              <button 
                className='rounded-full text-xl px-2 py-4 w-[48%]  border border-black text-black'>
                Wishlist
              </button>
            </div>

            <button 
              className='rounded-full hover:bg-yellow-600 text-xl px-2 py-4 bg-yellow-500 w-full text-white'>
              Buy Now
            </button>
          </div>
        </div>
      </div>
       {/* mobil  */}
       <div className='lg:hidden flex flex-col gap-3'>
            <div className='flex  gap-3'>
              <button 
                className='rounded-full  py-2 w-[90%] mx-auto bg-black  text-white'>
                Add to Cart
              </button>
              <button 
                className='rounded-full  mx-auto py-2 w-[90%]  border border-black text-black'>
                Wishlist
              </button>
            </div>

            <button 
              className='rounded-full hover:bg-yellow-600 py-2 w-full mx-auto bg-yellow-500  text-white'>
              Buy Now
            </button>
          </div>

       {/* relaeatd products */}
       <div>
        <h1 className='text-2xl font-semibold lg:py-3 py-1  text-black'>Similar Shouses </h1>
        {
          allProduct ?
            <div>
              {
                <Swiper
                modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                navigation
                spaceBetween={10}
                slidesPerView={ viewport < 500 ? 2.2 : 4}
                >
                  <div className='items-center  '>
                    {
                     allProduct.map((ele) => {
                        if (ele._id !== productId) {
                          return <div className='flex  items-center justify-center '>
                            <SwiperSlide>
                              <ProductCard product={ele} />
                            </SwiperSlide>
                          </div>
                        }
                      })
                    }
                  </div>
                </Swiper>
              }
            </div>
            : <div>Loading...</div>
        }
      </div>    

      {/* similer brands */}
      {
      category &&
      <div className='bg-slate-100 p-3'>
      <p className='text-xl font-semibold italic text-blue-500 my-3'>Similar Shouses Brands</p>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        navigation
        spaceBetween={10}
        slidesPerView={viewport < 500 ? 1.2 : 3.5}
      >
        {
          category.subCategories
            .map((item) => (
            item._id !== productInfo.subCategoryProducts &&  <div>
                <SwiperSlide>
                  <SubCategoryCard item={item} categoryId={category._id} />
                </SwiperSlide>
              </div>
            ))
        }
      </Swiper>
    </div>
     }
    </div>
   </div>
  )
}

export default SingleProduct
