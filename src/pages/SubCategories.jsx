import React, { useEffect, useState } from 'react'
import FilterSidebar from '../components/common/FilterSidebar'
import { useParams } from 'react-router-dom'
import { IoFilterSharp } from "react-icons/io5"
import { AiOutlineDown } from "react-icons/ai"
import { CategoryInfo } from '../service/operation/category'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/common/ProductCard'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import SubCategoryCard from '../components/common/SubCategoryCard'
import { setFilteredProduct } from '../slice/Product'

const SubCategories = () => {
  const { categoryId, subCategoryId } = useParams();
  const [toggled, setToggled] = useState(false);
  const [category, setCategory] = useState();
  const { subCategory, filteredProduct, productLoading } = useSelector((state) => state.product)
  const [filterLoading, setFilterLoading] = useState(false);
  const [viewport, setViewport] = useState(window.innerWidth);
  const [showFilter,setShowFilter] = useState(true);
  const [open,setOpen] = useState(false);
  const [short,setShort] = useState();
  const dispatch = useDispatch();
  
    
    const handleResize = () => {
        setViewport(window.innerWidth)
    }
    
    window.addEventListener("resize",handleResize);


  const fetchCategoryInfo = async () => {
    const result = await CategoryInfo(categoryId);
    if (result) {
      setCategory(result.data)
    }
  }

  const loadingFunction = () => {
    setFilterLoading(true)
    setInterval(() => {
      setFilterLoading(false)
    }, 2000);
  }

  useEffect(() => {
  if(short == "lToH"){
    const product = [... filteredProduct]
    const filterdProduct = product.sort((a,b) => a.price-b.price);
    dispatch(setFilteredProduct(filterdProduct))
  }else if(short == "hToL"){
    const product = [... filteredProduct]
    const filterdProduct = product.sort((a,b) => b.price - a.price);
    dispatch(setFilteredProduct(filterdProduct))
  }
  },[short])

  useEffect(() => {
    fetchCategoryInfo();
  }, [categoryId])

  if (!category) {
    return <div className='h-screen w-screen flex items-center justify-center'>
      <div className='custom-loader'></div>
    </div>
  }

  return (
    <div className='flex flex-col my-5 '>
      <div className='w-full flex items-center justify-between  text-black py-2 sticky top-0 z-40  px-5 mb-5  mt-5 bg-white'>
        <div className='flex flex-col'>
          <p className='text-xs'>{category.categoryName}/ {subCategory && subCategory.name}</p>
          <p className='text-xl font-semibold'>{subCategory && subCategory.name}({filteredProduct ? filteredProduct.length : 0})</p>
        </div>

        <div className='lg:flex hidden flex-row gap-4 text-lg'>
          <div onClick={()=>setShowFilter(!showFilter)}
          className='flex items-center flex-row gap-1 cursor-pointer'>
            <p>{showFilter ? "Hide" : "Show"} Filters</p>
            <p><IoFilterSharp /></p>
          </div>

          <div onClick={() => setOpen(!open)}
            className='flex items-center flex-row gap-1 cursor-pointer relative '>
            <p>Sort By</p>
            {
              open &&
              <div className='bg-gray-800 p-2 rounded-md flex flex-col items-start absolute w-40 shadow-lg transform translate-y-16 -translate-x-20'>
              <p onClick={() => setShort("hToL")}
              className={` px-3 py-2 rounded-md hover:bg-gray-700 cursor-pointer text-sm ${short === "hToL" ?  "text-blue-500" : "text-white" } `}>Price: High-Low</p>
              <p onClick={() => setShort("lToH")}
              className={` px-3 py-2 rounded-md hover:bg-gray-700 cursor-pointer text-sm ${short === "lToH" ?  "text-blue-500" : "text-white" } `} >Price: Low-High</p>
            </div>
            }
            <p className={`${open ? "rotate-180" : ""}`}><AiOutlineDown /></p>
          </div>
        </div>

        {/* mobile divces */}
        <div onClick={() => setToggled(true)}
          className='lg:hidden flex  flex-row gap-2 text-lg border rounded-xl px-2 py-1'>
          <p className='text-sm'>Filter</p>
          <p><IoFilterSharp /></p>
        </div>
      </div>

      <div className='flex  w-full min-h-[500px] '>
     {
      showFilter &&    <div className=' lg:w-[22%]'>
      <FilterSidebar
        toggled={toggled}
        setToggled={setToggled}
        loadingFunction={loadingFunction}
      />
    </div>
     }

        {/* product div */}
        <div className='w-full  h-full p-2 min-h-[700px] bg-slate-100 rounded-md flex   border'>

          {
            !filteredProduct ? <div className='w-full min-h-[700px]  items-center justify-center flex'>
              <div className='custom-loader '></div>
            </div>
              : filterLoading ? <div className='w-full min-h-[700px]  items-center justify-center flex'>
                <div className='custom-loader '></div>
              </div>
                : <div  className='flex flex-row flex-wrap w-full lg:gap-5 gap-1 p-1'>
                  {
                    filteredProduct.map((product) => {
                          return <div key={product._id} className='
                         product-card
                          '>
                        <ProductCard product={product} />
                      </div>
                    })
                  }
                </div>
          }
        </div>
      </div>

     {
      subCategory &&
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
            item._id !== subCategory._id &&  <div>
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
  )
}

export default SubCategories
