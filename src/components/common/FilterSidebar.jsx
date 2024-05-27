import React, { useEffect, useState } from 'react'
import { gender, ProColor, ProPrice, proRating } from '../../data/filterData'
import { AiOutlineCheck } from "react-icons/ai"
import { RxCross2 } from "react-icons/rx";
import { getAllSubCategoriesProduct } from '../../service/operation/subCategory';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFilteredProduct, setSubCategory } from '../../slice/Product';


const FilterSidebar = ({ toggled, setToggled }) => {
    const {categoryId,subCategoryId} = useParams();
    const dispatch = useDispatch();

    const fetchProducts = async()=> {
        const result = await getAllSubCategoriesProduct(subCategoryId);
        if(result){
          dispatch(setSubCategory(result.data));
          dispatch(setFilteredProduct(result.data.product))
         }
      }

      useEffect(() => {
        fetchProducts()
      },[])

    return (
        <div className='w-full h-full '>
            <div className='max-w-[17%] min-w-[250px] hidden lg:block  h-screen z-10  border p-4 overflow-y-scroll bg-scroll '>
                <div className='border-b border-black flex flex-col gap-1 py-4'>
                    <h1 className='text-xl font-semibold items-start pb-3'>Gender</h1>
                    {
                        gender.map((item, index) => {
                            return <div className='flex '
                                key={index}>
                                <label className='flex flex-row gap-2'>
                                    <input
                                        className='outline-none border border-black w-5 h-5'
                                        type='checkbox'
                                    />
                                    <p>{item.gender}</p>
                                </label>
                            </div>
                        })
                    }
                </div>

                <div className='border-b border-black flex flex-col gap-1 py-4'>
                    <h1 className='text-xl font-semibold items-start pb-3'>Shop By Price</h1>
                    {
                        ProPrice.map((item, index) => {
                            return <div className='flex '
                                key={index}>
                                <label className='flex flex-row gap-2'>
                                    <input
                                        className='outline-none border border-black w-5 h-5'
                                        type='checkbox'
                                    />
                                    <p>{item.price}</p>
                                </label>
                            </div>
                        })
                    }
                </div>

                <div className='border-b border-black flex flex-col gap-1 py-4'>
                    <h1 className='text-xl font-semibold items-start pb-3'>Color</h1>
                    <div className='flex flex-row flex-wrap '>
                        {
                            ProColor.map((item, index) => {
                                return <div
                                    className='flex flex-col justify-center items-center w-[32%] '
                                    key={index}>
                                    <div className={`w-[25px] h-[25px] rounded-full ${item.color}
             border-black border flex items-center justify-center text-xl
              ${item.colorName === "White" ? "text-black" : "text-white"}`}>

                                    </div>

                                    <p>{item.colorName}</p>

                                </div>
                            })
                        }
                    </div>
                </div>

                <div className=' flex flex-col gap-1 py-4 pb-24'>
                    <h1 className='text-xl font-semibold items-start pb-3'>Ratings</h1>
                    <div className='flex flex-row flex-wrap '>
                        {
                            proRating.map((item, index) => {
                                return <div className='flex '
                                    key={index}>
                                    <label className='flex flex-row gap-2'>
                                        <input
                                            className='outline-none border border-black w-5 h-5'
                                            type='checkbox'
                                        />
                                        <p>{item.rating}</p>
                                    </label>
                                </div>
                            })
                        }
                    </div>
                </div>

            </div>

            {/* mobile sidebar filter */}
            <div className={`transition-div ${toggled ? 'open' : 'closed'} overflow-auto absolute top-0 z-50`}>
                <div className="bg-white p-4 shadow-md min-h-screen">
                    {/* close div */}
                       <div className='flex items-center justify-end'>
                       <div onClick={() => setToggled(false)}
                            className='bg-black text-white p-1  w-fit rounded-full text-xl font-bold'>
                            <RxCross2 />
                        </div>
                       </div>

                       {/* filter keys */}
                       <div className='w-full p-4 overflow-y-scroll bg-scroll '>
                <div className='border-b border-black flex flex-col gap-1 py-4'>
                    <h1 className='text-xl font-semibold items-start pb-3'>Gender</h1>
                    {
                        gender.map((item, index) => {
                            return <div className='flex '
                                key={index}>
                                <label className='flex flex-row gap-2'>
                                    <input
                                        className='outline-none border border-black w-5 h-5'
                                        type='checkbox'
                                    />
                                    <p>{item.gender}</p>
                                </label>
                            </div>
                        })
                    }
                </div>

                <div className='border-b border-black flex flex-col gap-1 py-4'>
                    <h1 className='text-xl font-semibold items-start pb-3'>Shop By Price</h1>
                    {
                        ProPrice.map((item, index) => {
                            return <div className='flex '
                                key={index}>
                                <label className='flex flex-row gap-2'>
                                    <input
                                        className='outline-none border border-black w-5 h-5'
                                        type='checkbox'
                                    />
                                    <p>{item.price}</p>
                                </label>
                            </div>
                        })
                    }
                </div>

                <div className='border-b border-black flex flex-col gap-1 py-4'>
                    <h1 className='text-xl font-semibold items-start pb-3'>Color</h1>
                    <div className='flex flex-row flex-wrap '>
                        {
                            ProColor.map((item, index) => {
                                return <div
                                    className='flex flex-col justify-center items-center w-[32%] '
                                    key={index}>
                                    <div className={`w-[25px] h-[25px] rounded-full ${item.color}
             border-black border flex items-center justify-center text-xl
              ${item.colorName === "White" ? "text-black" : "text-white"}`}>

                                    </div>

                                    <p>{item.colorName}</p>

                                </div>
                            })
                        }
                    </div>
                </div>

                <div className=' flex flex-col gap-1 py-4 pb-24'>
                    <h1 className='text-xl font-semibold items-start pb-3'>Ratings</h1>
                    <div className='flex flex-row flex-wrap '>
                        {
                            proRating.map((item, index) => {
                                return <div className='flex '
                                    key={index}>
                                    <label className='flex flex-row gap-2'>
                                        <input
                                            className='outline-none border border-black w-5 h-5'
                                            type='checkbox'
                                        />
                                        <p>{item.rating}</p>
                                    </label>
                                </div>
                            })
                        }
                    </div>
                </div>

            </div>

                    </div>
            </div>

            </div>
        
    )
}

export default FilterSidebar
