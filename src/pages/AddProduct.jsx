import React from 'react'
import ProductCategory from '../components/core/addProduct/ProductCategory'
import ProductInformation from '../components/core/addProduct/ProductInformation'
import ProductImges from '../components/core/addProduct/ProductImges'

const AddProduct = () => {
  return (
    <div class="bg-gray-100 w-full h-full min-h-[85vh]  py-4 ">

    <div className='flex sticky top-0 flex-col justify-center p-8 text-blue-600 border border-blue-600 h-[110px] mx-auto bg-white  rounded-lg shadow-lg w-[1000px] max-w-[90%] mb-3'>
    <h2 class="text-2xl font-bold  text-center pb-2">Create Product</h2>
       <div className='flex items-center justify-between pb-4'>
       <div className='w-[30px] h-[30px] rounded-full border border-blue-600 text-center'>1</div>
         <div className='w-[40%] mx-2 border-b-2 border-dashed border-black'></div>
        <div className='w-[30px] h-[30px] rounded-full border border-blue-600 text-center'>2</div>
        <div className='w-[40%] mx-2 border-b-2 border-dashed border-black'></div>
        <div className='w-[30px]  h-[30px] rounded-full border border-blue-600 text-center'>3</div>
       </div>
    </div>

      <div className=''>
      {/* <ProductCategory/> */}
      {/* <ProductInformation/> */}
      {/* <ProductImges/> */}
      </div>
    
</div>
  )
}

export default AddProduct
