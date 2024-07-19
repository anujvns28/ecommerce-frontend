import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import cartImg from "../assets/empty-cart.jpg"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { RxCross1 } from "react-icons/rx"
import CartCard from '../components/core/cart/CartCard'


const Cart = () => {
    const { cart ,cartTotalPrice} = useSelector((state) => state.product);
    const { user } = useSelector((state) => state.profile);


    const nevagite = useNavigate()

    return (
        <div className='mb-10 flex flex-col items-center justify-center gap-4  lg:w-[80%]  mx-auto'>
            {
                cart.length !== 0
                    ? <div className='w-full '>
                        <h1 className='lg:text-3xl text-xl font-semibold text-center py-2 lg:py-6'>Shopping Cart</h1>
                        <div className='flex lg:flex-row flex-col gap-4  justify-between'>

                            <div className='lg:w-[60%]  w-[85%] mx-auto'>
                                <h1 className='text-xl font-semibold text-start py-1 lg:py-6'>Cart Items</h1>
                                <div className='flex lg:flex-col flex-col gap-2'>
                                    {
                                        cart.map((item,index) => {
                                            return <CartCard item={item} key={index}/>
                                        })
                                    }
                                </div>
                            </div>

                            <div className='lg:w-[33%] w-full hidden lg:flex flex-col'>
                                <h1 className='text-xl font-semibold text-start py-6'>Cart Items</h1>
                                <div className='bg-slate-400 rounded-md p-3'>
                                    <div className='flex items-center justify-between border-b border-solid p-3 text-2xl'>
                                        <h2>SUBTOTAL</h2>
                                        <h2>₹{cartTotalPrice}</h2>
                                    </div>
                                    <p className='p-3'>The subtotal reflects the total price of your order, including duties and taxes, before any applicable discounts. It does not include delivery costs and international transaction fees.</p>

                                </div>
                                <div
                                    className='px-6 text-center cursor-pointer py-4 text-xl mt-5 bg-black rounded-full text-white hover:bg-opacity-80'
                                >Checkout</div>
                            </div>

                            {/* mobile checkout */}
                            <div className='w-[95%] mx-auto flex lg:hidden p-2 bg-white sticky bottom-2 justify-between border rounded-md items-center'>
                                <div className='px-8 text-xl '>₹{cartTotalPrice}</div>
                                <div
                                    className='px-10 text-center cursor-pointer py-2  bg-black rounded-md text-white hover:bg-opacity-80'
                                >Checkout
                                </div>

                            </div>
                        </div>
                    </div>
                    : <div className='w-full flex flex-col items-center justify-center'>
                        <img width={450}
                            src={cartImg}></img>
                        <h2 className='text-xl font-semibold'>Your cart is empty</h2>
                        <p className='text-center text-base'>Looks like you have not added anything in your cart.<br />
                            Go ahead and explore top categories.</p>
                        <Link to={"/"}>
                            <div className='px-6 py-4 text-xl mt-5 bg-black rounded-full text-white hover:bg-opacity-80'
                            >Continue Shopping</div>
                        </Link>
                    </div>
            }
        </div>
    )
}

export default Cart
