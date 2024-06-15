import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { changeDiscountPrice } from '../../../service/operation/product';
import { useDispatch, useSelector } from 'react-redux';

const DiscountModal = ({ data, setModal,fetchUserProducts }) => {
    const [formData, setFormData] = useState();
    const { productLoading } = useSelector((state) => state.product)
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        const dum = {
            ...formData,
            productId:data._id
        }
        changeDiscountPrice(dum, dispatch);
        fetchUserProducts();
        setModal(false);
    }

    useEffect(() => {
       setFormData({price:data.price,discountPrice:data.discountPrice})
    },[])
    return (
        <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
            <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                {
                    productLoading ?
                        <div className='h-full w-full flex items-center text-black justify-center'>
                            <div className='custom-loader'></div>
                        </div>

                        : <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                            <div className='flex justify-between items-center'>
                                <h2 class="text-2xl font-bold text-green-500 mb-4">Change Discount </h2>
                                <p onClick={() => setModal(false)}
                                    className='text-2xl font-semibold bg-green-500 rounded-full p-1 cursor-pointer'><RxCross2 /></p>
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700">Original Price:</label>
                                <input type="number"
                                    class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    value={formData ? formData.price : data.price}
                                    name='price'
                                    onChange={handleChange}
                                />
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700">Discounted Price:</label>
                                <input type="number"
                                    class="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    value={formData ? formData.discountPrice : data.discountPrice}
                                    name='discountPrice'
                                    onChange={handleChange}
                                />
                            </div>
                            <button onClick={handleSubmit}
                                class="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Change</button>

                        </div>
                }
            </div>
        </div>


    )
}

export default DiscountModal
