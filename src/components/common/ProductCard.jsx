import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({product}) => {
  return (
    <Link>
    <div className='drop-shadow-lg p-3 w-full mb-4 rounded-xl bg-white  '>
      
    <div className=' flex justify-center w-full items-center  border-b rounded-lg '>  
    <img className=' object-cover bg-cover aspect-square rounded-t-md h-[120px] w-[130px] lg:h-[300px] lg:w-full border' 
    src={product.mainImage}
     />
    </div>
    <div className="flex flex-col lg:gap-2  px-1 py-3  mt-1 rounded-md  mx-auto">
          <p className="lg:text-[1.1rem] text-sm  font-semibold text-richblack-5 ">{product.productName}</p>
          <p className="lg:text-[1.1rem] text-xs font-semibold text-slate-500">{product.forWhom}'s shouse</p>
          <p className="lg:text-[1.1rem] text-xs font-semibold text-slate-500 ">color : {product.color}</p>
          <p className="lg:text-[1.1rem] font-semibold text-richblack-5 ">MRP : ₹ {product.price}</p>
    </div>
     
    </div>
    </Link>
  )
}

export default ProductCard
