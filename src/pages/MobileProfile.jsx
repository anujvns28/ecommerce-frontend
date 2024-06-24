import React from 'react'
import ProfileInfo from '../components/core/profile/ProfileInfo'
import { useSelector, } from 'react-redux';
import { useState } from 'react';
import UpdateProfileImg from '../components/core/profile/UpdateProfileImg';
import Address from '../components/core/profile/Address';
import { IoMdAdd } from "react-icons/io";
import { VscGift } from "react-icons/vsc"
import { useNavigate } from 'react-router-dom';
import UpdatePassword from '../components/core/profile/UpdatePassword';

const MobileProfile = () => {
    const { user } = useSelector((state) => state.profile);
    const [changeImage, setChangeImg] = useState(false);
    const navigate = useNavigate();

    return (
        <div className='w-full h-full'>
            <div className='flex items-center justify-center w-full gap-2 py-2 '>
                <button onClick={() =>navigate("/add-address")}
                    className='py-2 w-[45%]   px-4 font-semibold border border-black rounded-md text-black items-start '>
                        Address 
                </button>


                <button onClick={() => navigate("/wishlist")}
                    className='py-2 px-4 w-[45%] font-semibold border border-black rounded-md text-black items-start '>
                        Wishlist
                </button>
            </div>

            <div>
                <div className='w-full  flex flex-row gap-2 p-3 '>
                    <div className='  cursor-pointer ' >
                        <img onClick={() => setChangeImg(true)}
                            className='w-[60px] h-[60px] rounded-full '
                            src={user.image} />
                    </div>
                    <div className='p-2'>
                        <p className='text-xs'>Hello,</p>
                        <h1 className='text-xl'>{user.firstName} {user.lastName}</h1>
                    </div>
                </div>
            </div>
            <div className='my-3'>
                <ProfileInfo />
            </div>

            <div>
                <UpdatePassword/>
            </div>

            {
                changeImage && <UpdateProfileImg setChangeImg={setChangeImg} />
            }
        </div>
    )
}

export default MobileProfile
