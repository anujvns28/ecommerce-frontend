import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRatingAndReview } from '../../service/operation/product';
import { IoStar } from "react-icons/io5";

const ProductCard = ({product}) => {
  const [rating,setReting] = useState(0);

  const fethRating = async() => {
    const result = await getRatingAndReview(product._id);
    if(result){
      setReting(result.data.averageRating.toFixed(1));
    }
  }


  useEffect(() => {
     fethRating();
  },[])

  
    return (
    <Link to={`/shouse/${product._id}`}>
    <div className='drop-shadow-lg p-3 w-full mb-4 rounded-xl bg-white  '>
      
    <div className=' flex justify-center w-full items-center  border-b rounded-lg relative'>
     {
      rating > 0 && 
      <div className='flex bg-white p-1 rounded-md flex-row items-center justify-center top-1 right-3 absolute gap-1'>
      <p className='text-yellow-500 text-xl'><IoStar/></p>
       <p className=''>{rating ? rating : ""}</p>
    </div> 
     }
    <img className=' object-cover bg-cover aspect-square rounded-t-md h-[120px] w-[130px] lg:h-[300px] lg:w-full border' 
    src={product.mainImage}
     />
    </div>
    <div className="flex flex-col lg:gap-2  px-1 py-3  mt-1 rounded-md  mx-auto">
          <p className="lg:text-[1.1rem] text-sm  font-semibold text-richblack-5 ">{product.productName.length > 10 ? product.productName.slice(0,14) : product.productName}</p>
          <p className="lg:text-[1.1rem] text-xs font-semibold text-slate-500">{product.forWhom}'s shouse</p>
          <p className="lg:text-[1.1rem] text-xs font-semibold text-slate-500 ">color : {product.color}</p>
          <p className="lg:text-[1.1rem] text-sm font-semibold text-richblack-5 ">MRP : ₹ {product.price}</p>
    </div>
     
    </div>
    </Link>
  )
}

export default ProductCard
