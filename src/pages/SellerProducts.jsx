import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProducts } from '../service/operation/product';

const SellerProducts = () => {
    const {user,userLoading} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const [products,setProducts] = useState();

    const fetchUserProducts = async() => {
        const result = await getUserProducts(user._id,dispatch);
        setProducts(result.data);
    }

    useEffect(() => {
        fetchUserProducts();
    },[])
    
  if(userLoading){
    return <div className='h-screen w-screen flex items-center text-black justify-center'>
     <div className='custom-loader'></div>
    </div>
  }  
  return (
    <div className='w-full h-full lg:min-h-screen min-h-[300px]'>
      {
        !products ? 
        <div className='w-full h-full lg:min-h-screen min-h-[300px]  flex items-center justify-center'>
            <p className='text-xl font-semibold'>Not Found</p>
        </div>
        : <div>

        </div> 
      }
    </div>
  )
}

export default SellerProducts
