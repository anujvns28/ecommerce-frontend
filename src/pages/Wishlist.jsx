import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from "../assets/logo.svg"
import { Link, useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md"
import { removeToWishlist } from '../slice/Product';

const Wishlist = () => {
    const { wishlist } = useSelector((state) => state.product);
    const nevigate = useNavigate();
    const dispatch = useDispatch();


    const handleDelete = (data) => {
        dispatch(removeToWishlist(data))
    }

    return (
        <div className='mb-10 p-3 flex flex-col lg:min-h-[80vh] items-center justify-center gap-4  lg:w-[80%]  mx-auto'>
            {
                wishlist.length === 0
                    ? <div className='w-full flex min-h-[60vh] lg:min-h-[80vh] flex-col items-center justify-center' >
                        <img src={logo} className='sm:w-[200px]'/>
                        <h1 className='text-xl font-semibold'>No Shouse found in your Wishlist!</h1>
                        <p>Add a Shouse in Wishlist.</p>
                    </div>
                    : <div className='w-full h-full flex flex-col gap-4'>
                        {
                            wishlist.map((product) => {
                                return <div key={product._id} className='w-full p-2 border border-black flex gap-1 lg:gap-5 '>

                                    <div className='w-full p-2  flex flex-row lg:gap-5 gap-2 '>
                                        <Link to={`/shouse/${product._id}`}>
                                            <div className='lg:w-[150px] lg:h-[150px] w-[120px] h-[120px] object-fill'>
                                                <img className='w-full h-full rounded-md border border-solid'
                                                    src={product.mainImage} />
                                            </div>
                                        </Link>
                                        <div>
                                            <p className='lg:text-2xl  lg:font-semibold font-bold'>{product.productName}</p>
                                            <p className='font-semibold'>Price : {product.price}</p>
                                            <p className=' font-semibold'>{product.forWhom}'s Shouse</p>
                                            
                                        </div>
                                    </div>

                                    <p onClick={() => handleDelete(product)}
                                        className='text-2xl h-fit font-semibold items-center w-fit cursor-pointer'>< MdDelete /></p>

                                </div>
                            })
                        }

                    </div>
            }



        </div>
    )
}

export default Wishlist
