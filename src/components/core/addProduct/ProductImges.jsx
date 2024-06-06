import { InputHandler } from 'concurrently';
import React, { useState } from 'react'

const ProductImges = () => {
     const [imageCount,setImageCount] = useState([1,2]);

     const handleImage = () =>{
      const images = [...imageCount];
      images.push(images.length + 1)
      setImageCount(images);
     }
 
  return (
    <div class="flex items-center justify-center w-[1000px] mx-auto max-w-[90%] ">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full pb-12 flex flex-col ">
        <h2 class="text-2xl font-bold pb-4 text-center">Select Shouse Images</h2>
         
         <p className='block text-sm font-medium text-gray-700 pb-2'>Shose main image</p>
         <div className='w-[300px] h-[300px] rounded-md p-3 border border-gray-300 shadow-sm focus:outline-none hover:ring-blue-500 hover:border-blue-500'>
         <input
          type='file'
          className='opacity-0 w-full h-full '
          />
         </div>

         <div className='pt-3 flex flex-row items-center  gap-3 flex-wrap'>
          {
            imageCount.map((item) =>{
              return  <div>
                <p className='block text-sm font-medium text-gray-700 pb-2'>Shose image</p>
              <div className='w-[300px] h-[300px] rounded-md p-3 border border-gray-300 shadow-sm focus:outline-none hover:ring-blue-500 hover:border-blue-500'>
              <input
               type='file'
               className='opacity-0 w-full h-full '
               />
              </div>
              </div>
              
            })
          }
          <div onClick={handleImage}>Add More image</div>
         </div>
      </div>
    </div>
  )
}

export default ProductImges
