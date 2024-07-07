import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-stars'
import { getRatingAndReview } from '../../../service/operation/product'
import RatingAndReviewModal from '../../common/RatingAndReviewModal'

const OrderCard = ({ product }) => {
    const [averageRating,setAvgRating] = useState();
    const [reviewModal,setReviewModal] = useState(false);

    const fetchRating = async() => {
        const data = await getRatingAndReview(product._id);
       
        if(data){
           setAvgRating(data.data.averageRating)
        }
    }

    useEffect(() => {
        fetchRating();
    },[])
    return (
        <div className='w-full p-4 border border-black flex flex-col md:flex-row justify-between'>

        <div className='p-2 flex flex-row gap-5'>
            <Link to={`/shouse/${product._id}`}>
                <div className='w-[120px] h-[120px]'>
                    <img className='w-full h-full rounded-md border border-solid' src={product.mainImage} />
                </div>
            </Link>
            <div>
                <p className='text-2xl font-semibold'>{product.productName}</p>
                <p className='font-semibold'>Price: {product.price}</p>
                <p className='font-semibold'>{product.forWhom}'s Shouse</p>
                <ReactStars
                    count={5}
                    value={averageRating}
                    edit={false}
                    size={24}
                    color2={'#ffd700'}
                />
            </div>
        </div>
    
        <div className='flex flex-col gap-1 mt-4 md:mt-0'>
            <p className='flex font-semibold text-green-400'>Delivered</p>
            <p className='text-xs '>Your item has been delivered</p>
            <p onClick={() => setReviewModal(true)} className='text-blue-600 underline font-semibold cursor-pointer'>★ Rate & Review Product</p>
        </div>
    
        {reviewModal && <RatingAndReviewModal productId={product._id} setReviewModal={setReviewModal} />}
    </div>
    
    )
}

export default OrderCard
