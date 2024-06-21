import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import DiscountModal from './DiscountModal';
import { useDispatch, useSelector } from 'react-redux';
import { setIsEdit, setProductInformation } from '../../../slice/Product';
import { deleteProduct } from '../../../service/operation/product';
import Modal from '../../common/Modal';

const SellerProductCard = ({product,fetchUserProducts}) => {
  const [modal,setModal] = useState(false);
  const [deleteModal,setDeleteModal] = useState();
  const {user} = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
    const discountAmount = originalPrice - discountedPrice;
    const discountPercentage = (discountAmount / originalPrice) * 100;
    console.log(discountPercentage,"this is discount presse")
    return discountPercentage.toFixed(2); 
}

  const handleEdit = () => {
    dispatch(setProductInformation(product))
    dispatch(setIsEdit(true))
    navigate("/create-product");
  }

  const handleDelete = async() => {
    const data = {
      userId : user._id,
      productId : product._id,
      subCategoryId : product.subCategory
    }

    await deleteProduct(data,dispatch)
    fetchUserProducts();
  }

  

  return (
   
    <div className='border-b-2 p-2 w-[90%] mx-auto flex flex-row items-center justify-between gap-2'>
      <div className='flex flex-row gap-4'>
      <Link to={`/shouse/${product._id}`}>
        <img className='h-[200px] w-[200px] object-fill rounded-md'
        src={product.mainImage}
        />
       </Link>
      <div className='py-2'>
        <p className='text-2xl  font-semibold '>{product.productName}</p>
        <p className=' font-semibold text-slate-500 '>{product.productDes}</p>

        <p className=' font-semibold text-slate-500 pt-3 '>Price : {product.price}</p>
        <p className=' font-semibold text-slate-500 '>Color : {product.color}</p>
        <p className=' font-semibold text-slate-500 '>Gender : {product.forWhom}</p>
      </div>
      </div>

      <div className='flex flex-col items-center  py-8 px-4'>
       <p className='text-2xl flex flex-row text-green-500 items-center justify-between gap-1 font-semibold'>Discount : <BiSolidOffer/></p>
       <div className='flex flex-row gap-3 items-center justify-center text-xl'>
       <p>{(100 - calculateDiscountPercentage(product.price,product.discountPrice)).toFixed(2)}%</p>
       <p onClick={() => setModal(true)}
       className='text-slate-600 cursor-pointer'><MdEdit/></p>
       </div>
      </div>

      <div className='text-2xl font-semibold py-8 px-4 flex flex-col gap-8  items-center justify-between'>
        <p onClick={handleEdit}
        className='cursor-pointer'><MdEdit/></p>
        
        <p onClick={() => setDeleteModal({
          text1:"Delete Product",
          text2:"Are you sure want to Delete?",
          btn1:"Cancle",
          bet2:"Delete",
          handler1:() => setDeleteModal(null),
          handler2:() => handleDelete()
        })}
        className='cursor-pointer'><MdDelete/></p>
      </div>

      {
        modal && <DiscountModal data={product} setModal={setModal} fetchUserProducts={fetchUserProducts}/>
      }
      {
        deleteModal && <Modal modalData={deleteModal}/>
      }
    </div>
  
  )
}

export default SellerProductCard
