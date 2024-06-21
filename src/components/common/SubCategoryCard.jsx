import React from 'react'
import { Link } from 'react-router-dom'
import { getAllSubCategoriesProduct } from '../../service/operation/subCategory';
import { useDispatch } from 'react-redux';
import { setFilteredProduct, setSubCategory, setTotalProduct } from '../../slice/Product';

const SubCategoryCard = ({item,categoryId}) => {
  const dispatch = useDispatch()
  
 
  const handelSubCategoryProduct = async() => {
    const result = await getAllSubCategoriesProduct(item._id);
        if (result) {
            dispatch(setSubCategory(result.data));
            dispatch(setFilteredProduct(result.data.product))
            dispatch(setTotalProduct(result.data.product))
            localStorage.setItem("allProduct",JSON.stringify(result.data.product))
        }
  }

  return (
    <Link to={`/products/${categoryId}/${item._id}`}>
    <div onClick={handelSubCategoryProduct}
    className='drop-shadow-lg p-3 mb-4 rounded-xl bg-white    group transition-all duration-800 '>
      
    <div className=' flex justify-center w-full items-center bg-slate-100 border-b rounded-lg '>  
    <img className=' object-cover rounded-t-md h-[250px] w-[250px] lg:h-[350px] lg:w-[400px] border' 
    src={item.image} />
    </div>
    <div className="flex flex-col gap-2 px-1 py-3  mt-1 items-center rounded-md ">
          <p className="text-xl font-semibold text-richblack-5 italic">{item.name}</p>
    </div>
     
    </div>
    </Link>
  )
}

export default SubCategoryCard
