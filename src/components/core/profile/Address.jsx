import React, { useState } from 'react'
import logo from "../../../assets/logo.svg"
import { useNavigate, } from 'react-router-dom'
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import AddAddress from './AddAddress';
import { MdModeEdit } from "react-icons/md";
import { deleteAddress } from '../../../service/operation/profile';


const Address = () => {
    const nevigate = useNavigate();
    const dispatch = useDispatch();
    const { user,userLoading } = useSelector((state) => state.profile);
    const [addAddress, setAddAddress] = useState(false);
    const [addressData,setAddressData] = useState();

      const handleDelete = async(addressId) =>{
       const data = {
        userId:user._id,
        addresId:addressId
       }

      await deleteAddress(data,dispatch)
      }

    return (
        <div className='w-full h-full '>
            {
            !addAddress ?
                <div className='w-full h-full '>
                    {
                        user.address.length === 0
                            ? <div className='flex flex-col gap-2 items-center w-full h-full justify-center' >
                                <img src={logo} />
                                <h1 className='text-xl font-semibold'>No Addresses found in your account!</h1>
                                <p>Add a delivery address.</p>
                                <button onClick={() => setAddAddress(true)}
                                    className='py-2 px-4 bg-yellow-400 rounded-md '>Add Address</button>
                            </div>
                            : <div className='w-full h-full flex flex-col gap-4'>
                                {
                                    user.address.map((address) => {
                                        return <div className='w-full p-4 border border-black flex  gap-5 '>

                                            <div className='w-full p-4  flex flex-col gap-5 '>
                                                <div className='flex text-xl font-semibold flex-row gap-4'>
                                                    <p>{address.name}</p>
                                                    <p>{address.phoneNumber}</p>
                                                </div>
                                                <p> {address.address}, {address.locality}, {address.city}, {address.state}, -{address.pincode} </p>
                                            </div>

                                                <p onClick={() => handleDelete(address._id)}
                                                className='text-2xl font-semibold items-center cursor-pointer'>{userLoading ? "Deleting..":< MdDelete />}</p>
                                                <p onClick={() => {
                                                    setAddressData(address)
                                                    setAddAddress(true)
                                                }}
                                                className='text-2xl font-semibold items-center cursor-pointer'>< MdModeEdit /></p>
                                        </div>
                                    })
                                }

                                <button onClick={() => setAddAddress(true)}
                                    className='p-3 bg-yellow-400 rounded-md'>Add New Address</button>
                            </div>
                    }
                </div>
                : <AddAddress setAddAddress={setAddAddress} addressData={addressData}/>
            }
        </div>
    )
}

export default Address
