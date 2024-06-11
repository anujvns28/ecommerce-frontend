import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { setProductCreatingSteps } from '../../../slice/Product';

const ProductImges = () => {
  const [imageCount, setImageCount] = useState([1, 2, 3, 4]);
  const dispatch = useDispatch();

  const handleImage = () => {
    const images = [...imageCount];
    images.push(images.length + 1)
    setImageCount(images);
  }

  return (
    <div class="flex items-center justify-center w-[1000px] mx-auto max-w-[90%] ">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full pb-12 flex flex-col ">
        <h2 class="text-2xl font-bold pb-4 text-center">Select Shouse Images</h2>

        <p className='block text-sm font-medium text-blue-600 pb-2 '>Shouse main image</p>
        <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
          <label class="flex items-center justify-center h-60 border-2 border-dashed border-blue-600  rounded cursor-pointer hover:bg-gray-100">
            <span class="text-gray-600">Click to select an image</span>
            <input id="imageInput" type="file" class="hidden" accept="image/*" />
          </label>
        </div>


        <div className='pt-5'>
          <p className='block text-sm font-medium text-blue-600 pb-2 '>Shouse  images</p>
          <div className=' flex flex-row items-center w-full  gap-3 flex-wrap'>

            {
              imageCount.map((item) => {
                return <div className=' h-full'>
                  <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
                    <label class="flex items-center justify-center w-60 h-60 border-2 border-dashed border-blue-600 rounded cursor-pointer hover:bg-gray-100">
                      <span class="text-gray-600">Click to select an image {item}</span>
                      <input id="imageInput" type="file" class="hidden" accept="image/*" />
                    </label>
                  </div>
                </div>

              })
            }
            <div className='w-60 h-60 flex items-center justify-center' >
              <div className=' rounded-full w-28 h-28 flex flex-col text-2xl items-center justify-center border-2 border-dashed border-blue-600 cursor-pointer hover:bg-gray-100'
                onClick={handleImage}>
                <FaPlus />
                <p className='text-xl'>Image</p>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-row gap-2 w-full justify-end top-4'>
        <div onClick={() => dispatch(setProductCreatingSteps(2))} class="flex justify-end">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Back</button>
        </div>
        <div class="flex justify-end">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Create Product</button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default ProductImges
