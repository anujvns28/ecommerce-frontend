import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import logo from "../assets/logo.svg"
import { getUserProducts } from '../service/operation/product';
import OrderCard from '../components/core/myOrder/OrderCard';

const MyOrders = () => {
    const { user, userLoading } = useSelector((state) => state.profile)
    const [orders, setOrders] = useState();

    const dispatch = useDispatch();

    const gettingOrders = async () => {
        const orders = await getUserProducts(user._id, dispatch);
        if (orders) {
            setOrders(orders.data)
        }
    }

    useEffect(() => {
        gettingOrders()
    }, [])

    if (userLoading) {
        return <div className='h-screen w-screen flex items-center text-black justify-center'>
            <div className='custom-loader'></div>
        </div>
    }


    return (
        <div className='lg:w-[60%] w-[90%] mx-auto h-full my-7'>
            {
                orders
                    ? <div>
                        {
                            orders.length === 0
                                ? <div className='flex flex-col gap-2 items-center w-full h-full justify-center' >
                                    <img src={logo} />
                                    <h1 className='text-xl font-semibold'>Yor Are Not Order Yet!</h1>
                                    <p>Pleace Buy now</p>
                                    <div className='px-6 py-4 text-xl mt-5 bg-black rounded-full text-white hover:bg-opacity-80'
                                    >Buy Now</div>
                                </div>
                                : <div className='w-full h-full flex flex-col gap-4'>
                                    {
                                        orders.map((product,index) => {
                                            return <OrderCard product={product} key={index}/>
                                        })
                                    }

                                </div>
                        }
                    </div>
                    : <div ></div>
            }



        </div>
    )
}

export default MyOrders
