import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri"
import { useDispatch } from 'react-redux';
import { addCartPrice, removeCart, subCartPrice, updateCartProduct } from '../../../slice/Product';


const CartCard = ({ item }) => {
    const [quantity, setQuantity] = useState(1);
    const qun = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const dispatch = useDispatch()


    const handleDelet = (productId) => {
        dispatch(removeCart(item))
        dispatch(subCartPrice(item.price))
    }

    const handleChange = (e) =>{
       setQuantity(e.target.value);
       dispatch(addCartPrice((e.target.value - 1) * item.price))
        if (item) {
            const dumm ={...item}; 
            dumm.updatedPrice = e.target.value * item.price;
            dispatch(updateCartProduct(dumm));
        }
    }


    return (
        <div className='w-full flex flex-row gap-3 border-solid border-b  py-4 '>
            <Link to={`/shouse/${item._id}`} >
                <div className=''>
                    <img className='rounded-md border w-[130px] h-[130px] lg:w-[150px] lg:h-[150px] object-fill'
                        src={item.mainImage} width={150} />
                </div>
            </Link>
            <div className='w-full  flex flex-col gap-4'>
                <div className='flex flex-col justify-between '>
                    <div className='flex lg:flex-row flex-col lg:items-center justify-between '>
                        <h1 className='lg:text-xl font-semibold text-start '>{item.productName}</h1>
                        <p className='sm:text-sm'>MRP : ₹ {item.updatedPrice ? item.updatedPrice : item.price}</p>
                    </div>
                    <div>
                        <p className='sm:text-sm'>{item.forWhom}</p>
                    </div>
                </div>
                <div className='flex items-center flex-row gap-6 justify-between'>
                    <div className='flex  lg:flex-row flex-col lg:items-center justify-between  lg:gap-6' >
                        <p>Size : {item.size}</p>
                        <label className='flex outline-none'>
                            <p>Quantity </p>
                            <select onChange={(e) => handleChange(e)}>
                                {
                                    qun.map((i) => {
                                        return <option 
                                        selected={i === item.updatedPrice/item.price ? true : false} 
                                        value={i} 
                                        >
                                            {i}
                                        </option>
                                    })
                                }
                            </select>
                        </label>
                    </div>
                    <div>
                        <p onClick={() => handleDelet(item._id)}
                            className='cursor-pointer'><RiDeleteBin6Line /></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartCard
