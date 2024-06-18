import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProducts } from '../service/operation/product';
import SellerProductCard from '../components/core/sellerProducts/SellerProductCard';
import { setProductCreatingSteps, setProductInformation } from '../slice/Product';

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
        dispatch(setProductCreatingSteps(1));
        dispatch(setProductInformation(null));
    },[])

   
    
  if(userLoading){
    return <div className='h-screen w-screen flex items-center text-black justify-center'>
     <div className='custom-loader'></div>
    </div>
  }  
  return (
    <div className='w-[70%] mx-auto p-3 border rounded-md my-3 h-full lg:min-h-screen min-h-[300px]'>
      {
        !products ? 
        <div className='w-full h-full lg:min-h-screen min-h-[300px]  flex items-center justify-center'>
            <p className='text-xl font-semibold'>Not Found</p>
        </div>
        : <div className='flex flex-col gap-3'>
            {
              products.map((item) => {
                return <SellerProductCard key={item._id} product={item} fetchUserProducts={fetchUserProducts}/>
              })
            }
        </div> 
      }
    </div>
  )
}

export default SellerProducts
