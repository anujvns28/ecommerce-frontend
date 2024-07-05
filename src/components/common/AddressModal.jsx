import React from 'react'
import { useSelector } from 'react-redux';
import {RxCross1} from "react-icons/rx"

const AddressModal = ({setShowAddressModal}) => {

    const { user } = useSelector((state) => state.profile);

  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
    <div className='absolute bg-slate-400 flex flex-col gap-5 p-4 w-[50%] py-11'>
      <div className='flex justify-between '>
        <p className='text-2xl font-semibold '>Select Delivery Address </p>
        < p onClick={() => setShowAddressModal(null)}
          className='text-2xl font-semibold cursor-pointer '><RxCross1 /></p>
      </div>
      {
        user.address.map((address) => {
          return <div 
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
      <button 
        className='p-3 bg-yellow-400 rounded-md'>Create New Address</button>
    </div>
  </div>
  )
}

export default AddressModal
