import React, { useEffect, useState } from 'react'
import { gender, ProColor, ProPrice, proRating } from '../../data/filterData'
import { AiOutlineCheck } from "react-icons/ai"
import { RxCross2 } from "react-icons/rx";
import { getAllSubCategoriesProduct } from '../../service/operation/subCategory';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  setFilteredProduct, setSubCategory } from '../../slice/Product';


const FilterSidebar = ({ toggled, setToggled,loadingFunction, }) => {
    const { categoryId, subCategoryId } = useParams();
    const [genderFilter, setGenderFilter] = useState([]);
    const [priceFilter, setPriceFilter] = useState([]);
    const [colorFilter, setColorFilter] = useState([]);
    const { allProduct,filteredProduct, } = useSelector((state) => state.product)
    const [serarchParams,setSearchParams] = useSearchParams();

    const dispatch = useDispatch();

    
    const fetchProducts = async () => {
        const result = await getAllSubCategoriesProduct(subCategoryId);
        if (result) {
            dispatch(setSubCategory(result.data));
        }
        
    }


    const handleGenderFilter = (gender) => {
        const genders = [...genderFilter];
        const index = genders.findIndex((item) => item == gender)
        if (index > -1) {
            genders.splice(index, 1);
        } else {
            genders.push(gender);
        }
        setGenderFilter(genders)
        if(genders.length == 0){
            const newSearchParams = new URLSearchParams(serarchParams.toString());
            newSearchParams.delete('gender');
            setSearchParams(newSearchParams)
        }else{
            const newSearchParams = new URLSearchParams(serarchParams.toString());
            newSearchParams.set('gender', genders);
            setSearchParams(newSearchParams)
        }
       
    }

    const handlePriceFilter = (price) => {
        const amouts = [...priceFilter];
        const index = amouts.findIndex((item) => item == price)
        if (index > -1) {
            amouts.splice(index, 1);
        } else {
            amouts.push(price);
        }
        setPriceFilter(amouts)
        if(amouts.length == 0){
            const newSearchParams = new URLSearchParams(serarchParams.toString());
            newSearchParams.delete('price');
            setSearchParams(newSearchParams)
        }else{
            const newSearchParams = new URLSearchParams(serarchParams.toString());
            newSearchParams.set('price', amouts);
            setSearchParams(newSearchParams)
        }
    }

    const handleColorFilter = (color) => {
        const colors = [...colorFilter];
        const index = colors.findIndex((item) => item == color)
        if (index > -1) {
            colors.splice(index, 1);
        } else {
            colors.push(color);
        }
        setColorFilter(colors)
        if(colors.length == 0){
            const newSearchParams = new URLSearchParams(serarchParams.toString());
            newSearchParams.delete('color');
            setSearchParams(newSearchParams)
        }else{
            const newSearchParams = new URLSearchParams(serarchParams.toString());
            newSearchParams.set('color', colors);
            setSearchParams(newSearchParams)
        }
    }

    

    // filter function
    const filter = () => {
        let filteredShouse
        dispatch(setFilteredProduct(allProduct))
      
        // price base filter
        if (priceFilter.length > 0) {
            let products = [];
            priceFilter.map((item) => {
                const amounts = item.split("-");
                const min_amt = amounts[0] == "Under" ? 0 : Number(amounts[0]);
                const max_amt = amounts[1] == "Over" ? 1000000 : Number(amounts[1]);
                allProduct.map((product) => {
                    if (product.price >= min_amt && product.price <= max_amt) {
                        products.push(product);
                    }
                })
            })
            dispatch(setFilteredProduct(products))
            filteredShouse = [...products];
        }

        // gender base filter
        if (genderFilter.length > 0 ) {
            let products = [];
            const shouse = filteredShouse ? filteredShouse : allProduct;
            genderFilter.map((gender) => {
                shouse.map((item) => {
                    if (item.forWhom == gender) {
                        products.push(item);
                    }
                });
            })
            dispatch(setFilteredProduct(products))
            filteredShouse = [...products];
        }

        //color base filter
        if (colorFilter.length > 0) {
            let products = [];
            const shouse = filteredShouse ? filteredShouse : allProduct
            colorFilter.map((color) => {
                shouse.map((item) => {
                    if (item.color == color) {
                        products.push(item);
                    }
                });
            })
            dispatch(setFilteredProduct(products))
            filteredShouse = [...products];
        }

        loadingFunction();
    }

    const checkFilters = () => {
        const genders = serarchParams.get("gender")
        const price = serarchParams.get("price");
        const color = serarchParams.get("color")
        if(genders){
           setGenderFilter(genders.split(","));
        }
        if(price){
            setPriceFilter(price.split(","));
         }
        if(color){
            setColorFilter(color.split(","))
        } 
        
    }

    

    useEffect(() => {
   
        filter()
       
    
    }, [genderFilter, colorFilter, priceFilter])

    useEffect(() => {
        fetchProducts()
        checkFilters()
    }, [])

    return (
        <div className='w-full h-full  '>
            <div className='max-w-[17%] sticky top-6 min-w-[250px] hidden lg:block  h-screen z-10  border p-4 overflow-y-scroll bg-scroll '>
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
                                        onChange={() => handleGenderFilter(item.gender)}
                                        checked={genderFilter.includes(item.gender) ? true : false}
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
                                        onChange={() => handlePriceFilter(item.price)}
                                        checked={priceFilter.includes(item.price) ? true : false}
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
                                return <div onClick={() => handleColorFilter(item.colorName)}
                                    className='flex flex-col justify-center items-center w-[32%] '
                                    key={index}>
                                    <div className={`w-[25px] h-[25px] rounded-full ${item.color}
                                           border-black border flex items-center justify-center text-xl
                                              ${item.colorName === "White" ? "text-black" : "text-white"}`}>
                                        {
                                            colorFilter.includes(item.colorName) ? <AiOutlineCheck /> : ""
                                        }
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
                <div className="bg-white p-4 shadow-md min-h-screen   z-[1000]">
                    <div className='flex items-center justify-end'>
                        {/* apply filter button */}
                    {
                        priceFilter.length > 0 || genderFilter.length > 0 || colorFilter.length > 0 ?
                             <div onClick={() => {
                                setToggled(false)
                                loadingFunction()
                             }}
                             className='bg-black w-[80%]  mx-auto text-white p-2 rounded-2xl flex items-center justify-center'>
                                Apply Filter
                            </div>
                            : ""
                    }
                     {/* close div */}
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
                                                onChange={() => handleGenderFilter(item.gender)}
                                                checked={genderFilter.includes(item.gender) ? true : false}
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
                                                onChange={() => handlePriceFilter(item.price)}
                                                checked={priceFilter.includes(item.price) ? true : false}
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
                                        return <div onClick={() => handleColorFilter(item.colorName)}
                                            className='flex flex-col justify-center items-center w-[32%] '
                                            key={index}>
                                            <div className={`w-[25px] h-[25px] rounded-full ${item.color}
                                              border-black border flex items-center justify-center text-xl
                                                ${item.colorName === "White" ? "text-black" : "text-white"}`}>
                                                {
                                                    colorFilter.includes(item.colorName) ? <AiOutlineCheck /> : ""
                                                }
                                            </div>

                                            <p>{item.colorName}</p>

                                        </div>
                                    })
                                }
                            </div>
                        </div>

                        <div className=' flex flex-col gap-1 py-4 pb-24'>
                            <h1 className='text-xl font-semibold items-start pb-3'>Ratings</h1>
                            <div className='flex flex-col gap-2 flex-wrap '>
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
