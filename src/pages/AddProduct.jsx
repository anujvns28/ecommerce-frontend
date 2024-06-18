import React from 'react'
import ProductCategory from '../components/core/addProduct/ProductCategory'
import ProductInformation from '../components/core/addProduct/ProductInformation'
import ProductImges from '../components/core/addProduct/ProductImges'
import { FaCheck } from "react-icons/fa6";
import { useSelector } from 'react-redux'

const AddProduct = () => {
  const { productCreatingStep ,isEdit} = useSelector((state) => state.product);

  return (
    <div class="bg-gray-100 w-full h-full min-h-[85vh]  py-4 ">

      <div className='flex sticky top-0 z-50 flex-col justify-center p-2 text-blue-600 border border-blue-600 h-[130px] mx-auto bg-white  rounded-lg shadow-lg w-[1000px] max-w-[90%] mb-3'>
        <h2 class="text-2xl font-bold  text-center pb-2">{isEdit ? "Edit Product " : "Create Product"} </h2>
        <div className='flex items-center justify-between pb-4'>
          <div className='flex flex-col gap-1 items-center justify-center'>
            <div className={`w-[30px] h-[30px] rounded-full border  text-center flex items-center  justify-center ${productCreatingStep > 1 ? "bg-yellow-400 text-2xl text-green-500" : "border-blue-600"}`}>
              {productCreatingStep > 1 ? <FaCheck/> : 1}
            </div>
            <p>Category</p>
          </div>

          <div className={`w-[40%] mx-2 border-b-2 border-dashed  -translate-y-3 ${productCreatingStep > 1 ? "border-green-500" : "border-black"}`}></div>
          
          <div className='flex flex-col gap-1 items-center justify-center'>
            <div className={`w-[30px] h-[30px] rounded-full border  text-center flex items-center  justify-center ${productCreatingStep > 2 ? "bg-yellow-400 text-2xl text-green-500" : "border-blue-600"}`}>
            {productCreatingStep > 2 ? <FaCheck/> : 2}
            </div>
            <p>Information</p>
          </div>

          <div className={`w-[40%] mx-2 border-b-2 border-dashed  -translate-y-3 ${productCreatingStep > 2 ? "border-green-500" : "border-black"}`}></div>

          <div className='flex flex-col gap-1 items-center justify-center'>
            <div className='w-[30px] h-[30px] rounded-full border border-blue-600 text-center'>3</div>
            <p>Image</p>
          </div>
        </div>
      </div>

      <div className=''>
        {productCreatingStep == 1 && <ProductCategory />}
        {productCreatingStep == 2 && <ProductInformation />}
        {productCreatingStep == 3 && <ProductImges />}
      </div>

    </div>
  )
}

export default AddProduct
