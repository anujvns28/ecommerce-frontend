import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({product}) => {
  return (
    <Link>
    <div className='drop-shadow-lg p-3 mb-4 rounded-xl bg-white    group transition-all duration-800 '>
      
    <div className=' flex justify-center w-full items-center bg-slate-100 border-b rounded-lg '>  
    <img className=' object-cover rounded-t-md h-[100px] w-[100px] lg:h-[350px] lg:w-[400px] border' 
    src={product.
        mainImage} />
    </div>
    <div className="flex flex-col gap-2 px-1 py-3  mt-1 items-center rounded-md ">
          <p className="lg:text-xl text-sm font-semibold text-richblack-5 italic">{product.productName}</p>
    </div>
     
    </div>
    </Link>
  )
}

export default ProductCard
