import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getSignleProductInfo } from '../service/operation/product';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/common/ProductCard';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { CategoryInfo } from '../service/operation/category';
import SubCategoryCard from '../components/common/SubCategoryCard';
import { size } from '../data/filterData';
import { IoIosArrowDown } from "react-icons/io";
import ReactStars from "react-rating-stars-component";
import Modal from '../components/common/Modal';
import { addToCart, addToWishlist } from '../slice/Product';

const SingleProduct = () => {

  const { productId } = useParams();
  const [productInfo, setProductInfo] = useState();
  const [imageIndex, setImageIndex] = useState(0);
  const { allProduct } = useSelector((state) => state.product);
  const [viewport, setViewport] = useState(window.innerWidth);
  const [category, setCategory] = useState();
  const [modalData,setModalData] = useState();
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleResize = () => {
    setViewport(window.innerWidth)
  }

  window.addEventListener("resize", handleResize);

  const fetchproductInfo = async () => {
    const result = await getSignleProductInfo(productId);
    if (result) {
      setProductInfo(result.data)
      const category = await CategoryInfo(result.data.category);
      if (category) {
        setCategory(category.data)
      }
    }
  }

  const goToLogin = () => {
   
  }

  // cart functin
  const handleCart = () => {
    if(!user){
      setModalData({
        text1:"Login!!",
        text2:"You are not logged in!",
        btn1:"Cancle",
        btn2:"Login",
        handler1:() => setModalData(null),
        handler2:() =>  navigate("/login")
      })
      return
    }
    dispatch(addToCart(productInfo))
  }

   // wishlist functin
   const handleWhisList = () => {
    if(!user){
      setModalData({
        text1:"Login!!",
        text2:"You are not logged in!",
        btn1:"Cancle",
        btn2:"Login",
        handler1:() => setModalData(null),
        handler2:() =>  navigate("/login")
      })
      return
    }
    dispatch(addToWishlist(productInfo))
  }

   // buy now functin
   const handleBuyNow = () => {
    if(!user){
      setModalData({
        text1:"Login!!",
        text2:"You are not logged in!",
        btn1:"Cancle",
        btn2:"Login",
        handler1:() => setModalData(null),
        handler2:() =>  navigate("/login")
      })
      return
    }
  }

  console.log("product Info", productInfo)

  useEffect(() => {
    fetchproductInfo();
  }, [productId])

  if (!productInfo) {
    return <div className='w-screen h-screen flex items-center justify-center '>
      <div className='custom-loader'></div>
    </div>
  }
  return (
    <div className='w-full h-full '>
      <div className=' w-11/12 mx-auto '>
        <div className=' lg:w-[77%] w-[95%] mx-auto flex lg:flex-row  my-10 flex-col-reverse gap-[8%]'>
          <div className='flex lg:flex-row  lg:h-[80vh] sticky top-8 flex-col-reverse gap-2 lg:w-[55%]  w-full'>
            <div className='relative'>
              {
                productInfo ?
                  <div
                    className='flex lg:flex-col  gap-2'>
                    {
                      productInfo.productsImages.map((item, index) => {
                        return <div key={index} className='w-20'>
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
            <div className='w-full  '>
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

            {/* size */}
            <div className='mb-4 hidden lg:flex flex-col'>
              <label class="block  font-medium text-gray-700">Select Size</label>
              <div className='flex flex-row flex-wrap gap-3 mt-1 '>
                {
                  size.map((item, index) => {
                    return <div key={index}
                      className={`w-[120px] text-center p-3 border border-gray-300 rounded-md shadow-sm   
                      ${productInfo.size.includes(item) ? "cursor-pointer focus:outline-none hover:ring-blue-500 hover:border-blue-500" : "bg-slate-50 opacity-30"}`}>{item}</div>
                  })
                }
              </div>
            </div>

            <div className='lg:flex hidden flex-col gap-3'>
              <div className='flex flex-row gap-3'>
                <button onClick={handleCart}
                  className='rounded-full text-xl px-2 py-4 w-[48%] bg-black  text-white'>
                  Add to Cart
                </button>
                <button onClick={handleWhisList}
                  className='rounded-full text-xl px-2 py-4 w-[48%]  border border-black text-black'>
                  Wishlist
                </button>
              </div>

              <button onClick={handleBuyNow}
                className='rounded-full hover:bg-yellow-600 text-xl px-2 py-4 bg-yellow-500 w-full text-white'>
                Buy Now
              </button>
            </div>

            {/* information */}
            <div className='pt-4 px-2 hidden lg:flex flex-col '>
              <p className='text-black font-semibold leading-relaxed'>
                A flash from the past, the Nike Court Royale 2 features the same design that has rocked the streets since the late '70s. Leather on the upper looks crisp and is easy to wear, while the large retro Swoosh design adds throwback appeal. To top it off, the modernised herringbone sole puts a twist on the classic look.
              </p>

              <details className=' border-y-2 mt-5 py-5'>
                <summary className='flex cursor-pointer items-center justify-between text-xl font-semibold   '>
                  <p className=' '> Delivery & Returns</p>
                  <p><IoIosArrowDown /></p>
                </summary>
                <div className='font-semibold leading-relaxed'>
                  <p className='pt-4'>All purchases are subject to delivery fees.</p>
                  <p><span className='text-3xl font-bold '>.</span> Standard delivery 4–9 business days</p>
                  <p>Orders are processed and delivered Monday–Friday (excluding public holidays)</p>
                  <p>Premimum Members enjoy free returns.</p>
                </div>
              </details>

              {/* ratting and revied */}
              <details className=' border-b-2  py-5'>
                <summary className='flex cursor-pointer items-center justify-between text-xl font-semibold   '>
                  <p className=' '> Reviews (38)</p>
                  <div className='flex items-center justify-center gap-2'>
                    <ReactStars
                      count={5}
                      size={24}
                      isHalf={true}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      activeColor="#ffd700"
                      value={4.3}
                      edit={false}
                    />
                    <p><IoIosArrowDown /></p>
                  </div>
                </summary>
                <div className='font-semibold leading-relaxed'>
                  <p className='pt-4'>All purchases are subject to delivery fees.</p>
                  <p><span className='text-3xl font-bold '>.</span> Standard delivery 4–9 business days</p>
                  <p>Orders are processed and delivered Monday–Friday (excluding public holidays)</p>
                  <p>Premimum Members enjoy free returns.</p>
                </div>
              </details>

              <details className=' border-b-2 py-5'>
                <summary className='flex cursor-pointer items-center justify-between text-xl font-semibold   '>
                  <p className=' '> Product Information</p>
                  <p><IoIosArrowDown /></p>
                </summary>
                <div className='font-semibold leading-relaxed'>
                  <p className='pt-4'>Declaration of Importer: Direct import by the individual customer</p>
                  <p className='pt-4'>Marketed by: Nike Global Trading B.V. Singapore Branch, 30 Pasir Panjang Road, #10-31/32, Mapletree Business City, Singapore 117 440</p>
                  <p className='font-bold'>Net Quantity: 1 Pair</p>
                </div>
              </details>
            </div>
          </div>
        </div>


        {/* mobile  */}
        <div className='lg:hidden flex flex-col gap-1'>
          {/* size */}
          <div className='mb-4 '>
            <label class="block  font-medium text-gray-700">Select Size</label>
            <div className='flex flex-row flex-wrap gap-2 mt-1 '>
              {
                size.map((item, index) => {
                  return <div key={index}
                    className={`w-[100px] text-center px-1 py-2 border border-gray-300 rounded-md shadow-sm   
                      ${productInfo.size.includes(item) ? "cursor-pointer focus:outline-none hover:ring-blue-500 hover:border-blue-500" : "bg-slate-50 opacity-30"}`}>{item}</div>
                })
              }
            </div>
          </div>
          {/* buttons */}
          <div className='flex flex-col gap-3'>
            <div className='flex  gap-3'>
              <button onClick={handleCart}
                className='rounded-full  py-2 w-[90%] mx-auto bg-black  text-white'>
                Add to Cart
              </button>
              <button onClick={handleWhisList}
                className='rounded-full  mx-auto py-2 w-[90%]  border border-black text-black'>
                Wishlist
              </button>
            </div>

            <button onClick={handleBuyNow}
              className='rounded-full hover:bg-yellow-600 py-2 w-full mx-auto bg-yellow-500  text-white'>
              Buy Now
            </button>
          </div>
          {/* information */}
          <div className='pt-4 px-2  '>
            <p className='text-black font-semibold leading-relaxed'>
              A flash from the past, the Nike Court Royale 2 features the same design that has rocked the streets since the late '70s. Leather on the upper looks crisp and is easy to wear, while the large retro Swoosh design adds throwback appeal. To top it off, the modernised herringbone sole puts a twist on the classic look.
            </p>

            <details className=' border-y-2 mt-5 py-5'>
              <summary className='flex cursor-pointer items-center justify-between text-xl font-semibold   '>
                <p className=' '> Delivery & Returns</p>
                <p><IoIosArrowDown /></p>
              </summary>
              <div className='font-semibold leading-relaxed'>
                <p className='pt-4'>All purchases are subject to delivery fees.</p>
                <p><span className='text-3xl font-bold '>.</span> Standard delivery 4–9 business days</p>
                <p>Orders are processed and delivered Monday–Friday (excluding public holidays)</p>
                <p>Premimum Members enjoy free returns.</p>
              </div>
            </details>

            {/* ratting and revied */}
            <details className=' border-b-2  py-5'>
              <summary className='flex cursor-pointer items-center justify-between text-xl font-semibold   '>
                <p className=' '> Reviews (38)</p>
                <div className='flex items-center justify-center gap-2'>
                  <ReactStars
                    count={5}
                    size={24}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                    value={4.3}
                    edit={false}
                  />
                  <p><IoIosArrowDown /></p>
                </div>
              </summary>
              <div className='font-semibold leading-relaxed'>
                <p className='pt-4'>All purchases are subject to delivery fees.</p>
                <p><span className='text-3xl font-bold '>.</span> Standard delivery 4–9 business days</p>
                <p>Orders are processed and delivered Monday–Friday (excluding public holidays)</p>
                <p>Premimum Members enjoy free returns.</p>
              </div>
            </details>

            <details className=' border-b-2 py-5'>
              <summary className='flex cursor-pointer items-center justify-between text-xl font-semibold   '>
                <p className=' '> Product Information</p>
                <p><IoIosArrowDown /></p>
              </summary>
              <div className='font-semibold leading-relaxed'>
                <p className='pt-4'>Declaration of Importer: Direct import by the individual customer</p>
                <p className='pt-4'>Marketed by: Nike Global Trading B.V. Singapore Branch, 30 Pasir Panjang Road, #10-31/32, Mapletree Business City, Singapore 117 440</p>
                <p className='font-bold'>Net Quantity: 1 Pair</p>
              </div>
            </details>
          </div>

        </div>
      </div>



      <div className='w-full bg-slate-100 p-3 mt-7'>
        <div className='w-11/12 mx-auto'>
          {/* relaeatd products */}
          <div>
            <h1 className='text-xl font-semibold italic text-blue-500 my-3'>Similar Shouses </h1>
            {
              allProduct ?
                <div>
                  {
                    <Swiper
                      modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                      navigation
                      spaceBetween={10}
                      slidesPerView={viewport < 500 ? 2.2 : 4.05}
                    >
                      <div className='items-center  '>
                        {
                          allProduct.map((ele) => {
                            if (ele._id !== productId) {
                              return <div key={ele._id} className='flex  items-center justify-center '>
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
            <div className=''>
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
                      item._id !== productInfo.subCategoryProducts && <div>
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
      { modalData && <Modal modalData={modalData}/>}
    </div>
  )
}

export default SingleProduct
