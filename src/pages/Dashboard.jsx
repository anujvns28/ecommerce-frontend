import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserProducts } from '../service/operation/product';

const Dashboard = () => {
    const { user } = useSelector((state) => state.profile)
    const dispatch = useDispatch();
    const [product, setProduct] = useState([]);

    const fetchUserProduct = async() => {
        const data = await getUserProducts(user._id,dispatch);
        if(data){
            const pro = data.data.filter((shouse) => shouse.customor.length > 0);
            setProduct(pro);
        }
    }

    console.log(product)
  

    useEffect(() => {
        fetchUserProduct();
    }, [])

   
    let totalIncome = 0
    if (product) {
        product.map((item) => {
            return totalIncome = totalIncome + item.price * item.customor.length
        })
    }
    

    return (
        <div className='w-11/12 mx-auto mb-4 min-h-screen'>
            <div className='w-[80%]  mx-auto  p-3'>
                <div className='flex flex-row gap-3 '>
                    <div className=' h-[150px] bg-slate-400 p-4 rounded-md flex flex-col gap-2 '>
                        <p className='text-2xl font-semibold'>Hello ! {user.firstName}</p>
                        <div className='flex flex-row gap-2 items-center '>
                            <img className='rounded-full '
                                src={user.image} width={60}></img>
                            <p className='text-xl font-semibold'>{user.email}</p>
                        </div>
                    </div>

                    <div className=' h-[150px] bg-slate-400 p-4 rounded-md flex flex-col gap-2 '>
                        <p className='text-2xl font-semibold'>Total Incom in Rupee</p>
                        <p className='text-xl font-semibold'> ₹ {totalIncome}</p>
                    </div>

                </div>

                {
                    product.length > 0 && <div className='flex justify-between  w-[85%] mx-auto text-xl font-semibold my-2'>
                    <div className='w-[35%]'>Product Details</div>
                    <div>Orders</div>
                    <div>Incom (₹)</div>
                </div>
                }

                <div className='pt-2 '>
                    {
                        product &&
                        <div className='flex flex-col gap-3 '>
                            {
                                product.map((product) => {
                                    return <div key={product._id} className='w-full  p-4 border border-black flex justify-between gap-5 '>

                                        <div className='w-full p-2  flex flex-row gap-5 '>
                                            <Link to={`/shouse/${product._id}`}>
                                                <div className='w-[150px] h-[150px]'>
                                                    <img className='w-full h-full rounded-md border border-solid'
                                                        src={product.mainImage} />
                                                </div>
                                            </Link>
                                            <div>
                                                <p className='text-2xl font-semibold'>{product.productName}</p>
                                                <p className='text-2xl font-semibold'>Price : ₹ {product.price}</p>
                                            </div>
                                        </div>

                                        <div  className='w-[30%] flex items-center text-2xl font-semibold'>
                                        <p>{product.customor.length}</p>
                                        </div>
                                       <div className='w-[30%]  flex items-center justify-center text-2xl font-semibold'>
                                       <p> ₹ {product.price*product.customor.length}</p>
                                       </div>

                                    </div>
                                })
                            }
                        </div>
                    }
                </div>

                {
                    !product.length > 0 && <div className='flex items-center justify-center h-64 text-xl'>You hav't sold product.</div>
                }

               
            </div>
        </div>
    )
}

export default Dashboard
