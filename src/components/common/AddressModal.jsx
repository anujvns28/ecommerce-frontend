import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {RxCross1} from "react-icons/rx";
import AddAddressForm from "../core/profile/AddAddress";
import { buyShouse } from '../../service/operation/payment';

const AddressModal = ({setShowAddressModal,productId}) => {

    const { user } = useSelector((state) => state.profile);
    const [addressForm,setAddressForm] = useState(false);

    const handleBuyNow = async(addressId) => {
    await buyShouse([productId],user,addressId)
    setShowAddressModal(false)
    }

  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white border bg-opacity-10 backdrop-blur-sm '>
    <div className='my-3 bg-slate-400 flex rounded-md flex-col gap-5 p-4 lg:w-[50%] '>
      <div className='flex justify-between '>
        <p className='lg:text-2xl text-xl font-semibold'>{user.address.length == 0 ? "Add Delivery Address" : "Select Delivery Address"} </p>
        < p onClick={() => setShowAddressModal(null)}
          className='text-2xl font-semibold cursor-pointer '><RxCross1 /></p>
      </div>
      {
        !addressForm ? <div className='flex flex-col gap-3'>
           {
        user.address.map((address) => {
          return <div onClick={() => handleBuyNow(address._id)}
            className='w-full p-4 border border-black flex cursor-pointer  gap-5 '>

            <div className='w-full p-4  flex flex-col gap-5 '>
              <div className='flex text-xl font-semibold flex-row gap-4'>
                <p>{address.name}</p>
                <p>{address.phoneNumber}</p>
              </div>
              <p> {address.address}, {address.locality}, {address.city}, {address.state}, -{address.pincode} </p>
            </div>

          </div>
        })
      }

       {
        user.address.length == 0 && <div className='text-center py-2'>You have not added Address Yet</div>
      }

      <button onClick={() => setAddressForm(true)}
        className='p-3 w-full bg-yellow-400 rounded-md'>{user.address.length == 0 ? "Add Address" : "Create New Address"}
      </button>

     
      
        </div>
        : <div >
            <AddAddressForm setAddAddress={setAddressForm}/>
          </div>
      }
    </div>
  </div>
  )
}

export default AddressModal
