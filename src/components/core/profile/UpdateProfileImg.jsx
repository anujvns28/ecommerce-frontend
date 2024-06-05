import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxCross2 } from "react-icons/rx";
import { useState } from 'react';
import { updateProfileImg } from '../../../service/operation/profile';

const UpdateProfileImg = ({setChangeImg}) => {
    const {user,userLoading} = useSelector((state) => state.profile);
    const [imageFile,setImageFile] = useState();
    const [imagePreveiw,setImagePreview] = useState();
    const inuptRef = useRef();
    const dispatch  = useDispatch();

    const handleImg = () => {
        inuptRef.current.click();  
    }

    const handleChange = (e) => {
      const file = e.target.files[0];
      if(file){
        setImageFile(file)
        setImagePreview(URL.createObjectURL(file))
      }
    }

    const changeProfile = async()=>{
        const data = {
            profileImage : imageFile,
            userId : user._id
        }

        await updateProfileImg(data,dispatch)
        setChangeImg(false)
    }

  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
     <div className='flex lg:h-[500px] lg:w-[600px] py-7 items-center justify-center flex-col rounded-md gap-4 bg-slate-100 text-white border border-black p-5'>
       <div className='flex w-full justify-between'>
       <p className='text-xl font-semibold text-blue-500'>Update Profile Image</p>
       <p onClick={() => setChangeImg(false)}
       className='text-2xl text-black cursor-pointer'><RxCross2/></p>
       </div>
       <img onClick={handleImg}
       className='rounded-full h-[300px] w-[300px] object-cover cursor-pointer'
       width={300} src={imagePreveiw ? imagePreveiw : user.image}
       />

       <input
       ref={inuptRef}
       onChange={(e) =>handleChange(e)}
       type='file'
       className='hidden'
       />

       {
        imageFile ? <p className='text-black'>Click on image for change image </p> 
        : <p className='text-black'>Click on profile image to select image </p> 
       } 

     {
        imageFile &&
        <div className='w-full justify-end flex'>
         
        <button onClick={changeProfile}
        className='py-2 px-4 font-semibold bg-yellow-400 rounded-md text-black items-start lg:w-[20%]'>{userLoading ? "Updating...": "Update"}</button>
        </div>
     }
    </div>
    </div>
  )
}

export default UpdateProfileImg
