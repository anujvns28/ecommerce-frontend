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
    const { user, userLoading } = useSelector((state) => state.profile);
    const [addAddress, setAddAddress] = useState(false);
    const [addressData, setAddressData] = useState();

    const handleDelete = async (addressId) => {
        const data = {
            userId: user._id,
            addresId: addressId
        }

        await deleteAddress(data, dispatch)
    }

    return (
        <div className='w-full h-full '>
            {
                userLoading ?
                    <div className='w-full h-full min-h-[400px] flex items-center justify-center'>
                        <div className='custom-loader'></div>
                    </div>
                    :
                    <div className='w-full h-full min-h-[400px] flex items-center justify-center'>
                        {
                            !addAddress ?
                                <div className='w-full h-full '>
                                    {
                                        user.address.length === 0
                                            ? <div className='flex flex-col  gap-2 items-center w-full h-full justify-center' >
                                                <img src={logo} className='lg:w-[300px] w-[200px]' />
                                                <h1 className='lg:text-xl font-semibold'>No Addresses found in your account!</h1>
                                                <p>Add a delivery address.</p>
                                                <button onClick={() => setAddAddress(true)}
                                                    className='py-2 px-4 bg-yellow-400 rounded-md '>Add Address</button>
                                            </div>
                                            : <div className='w-full h-full flex flex-col gap-4'>
                                                {
                                                    user.address.map((address) => {
                                                        return <div className='w-full p-4 border border-black flex  gap-5 '>

                                                            <div className='w-full lg:p-4 p-1  flex flex-col lg:gap-5 gap-1 '>
                                                                <div className='flex text-xl font-semibold flex-row gap-4'>
                                                                    <p>{address.name}</p>
                                                                    <p>{address.phoneNumber}</p>
                                                                </div>
                                                                <p> {address.address}, {address.locality}, {address.city}, {address.state}, -{address.pincode} </p>
                                                            </div>

                                                            <p onClick={() => handleDelete(address._id)}
                                                                className='text-2xl font-semibold items-center cursor-pointer'>< MdDelete /></p>
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
                                : <AddAddress setAddAddress={setAddAddress} addressData={addressData} />
                        }
                    </div>
            }
        </div>
    )
}

export default Address
