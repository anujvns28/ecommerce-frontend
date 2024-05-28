import React, { useEffect, useState } from 'react'
import { gender, ProColor, ProPrice, proRating } from '../../data/filterData'
import { AiOutlineCheck } from "react-icons/ai"
import { RxCross2 } from "react-icons/rx";
import { getAllSubCategoriesProduct } from '../../service/operation/subCategory';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredProduct, setSubCategory, setTotalProduct } from '../../slice/Product';


const FilterSidebar = ({ toggled, setToggled }) => {
    const { categoryId, subCategoryId } = useParams();
    const [genderFilter, setGenderFilter] = useState([]);
    const [priceFilter, setPriceFilter] = useState([]);
    const [colorFilter, setColorFilter] = useState([]);
    const {allProduct,filteredProduct} = useSelector((state) => state.product)
    const [productFilter,setProductFilter] = useState();

    const dispatch = useDispatch();

    const fetchProducts = async () => {
        const result = await getAllSubCategoriesProduct(subCategoryId);
        if (result) {
            dispatch(setSubCategory(result.data));
            dispatch(setFilteredProduct(result.data.product))
            dispatch(setTotalProduct(result.data.product))
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
    }


    useEffect(() => {
        console.log("running...")
        dispatch(setFilteredProduct(allProduct))
       

        if(priceFilter.length > 0){
            console.log("price...")
            let products = [];
            priceFilter.map((item) => {
                const amounts = item.split("-");
                const min_amt = amounts[0] == "Under" ? 0 : Number(amounts[0]);
                const max_amt = amounts[1] == "Over" ? 1000000 : Number(amounts[1]);
                allProduct.map((product) => {
                    if(product.price >= min_amt && product.price <= max_amt){
                        products.push(product);
                    }
                })
            })
            dispatch(setFilteredProduct(products))
            setProductFilter(products);
        }

        console.log(productFilter,"this is filterd product")

        if(genderFilter.length>0){
            let products = [];
            const filtering = productFilter ? productFilter : allProduct
            genderFilter.map((gender) => {
                filtering.map((item) => {
                    if(item.forWhom == gender){
                        products.push(item);
                    }
                });
            }) 
            dispatch(setFilteredProduct(products))  
        }


    }, [genderFilter, colorFilter, priceFilter])

    useEffect(() => {
        fetchProducts()
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
