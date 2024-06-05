import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { updateUserProfile } from '../../../service/operation/profile';
import UpdateProfileImg from './UpdateProfileImg';
import useGetViewPort from '../../../hook/useGetViewPort';
import { useNavigate } from 'react-router-dom';

const ProfileInfo = () => {
  const {user,userLoading} = useSelector((state) => state.profile);
  const {register,setValue,getValues,handleSubmit} = useForm();
  const dispatch = useDispatch();
  const viewport = useGetViewPort();
  const navigate = useNavigate();

    const gender = [
        {gender:"Male"},
        {gender:"Female"}
    ]

   

    const isInformationUpdated = (data) => {
      if(data.firstName !== user.firstName ||
        data.lastName !== user.lastName ||
        data.gender !== user.additionalInfo.gender ||
        data.contactNumber !== user.additionalInfo.contactNumber ||
        data.about !== user.additionalInfo.about ||
        data.dateOfBirth !== user.additionalInfo.dateOfBirth
      ){
        return true
      }else{
        return false
      }
    }

    const handleForm = async(data) => {
      const result = isInformationUpdated(data);
     if(result){
      await updateUserProfile(data,dispatch)
     }else{
      toast.error("No updation made")
     }
    }

    useEffect(() => {
      setValue("userId",user._id);
     setValue("firstName",user.firstName);
     setValue("lastName",user.lastName);
     setValue("gender",user.additionalInfo.gender);
     setValue("dateOfBirth",user.additionalInfo.dateOfBirth);
     setValue("contactNumber",user.additionalInfo.contactNumber);
     setValue("about",user.additionalInfo.about)
    },[])

    

    if(userLoading){
      return <div className=' border h-full flex items-center justify-center'>
        <div className='custom-loader'></div>
      </div>
    }


   
  return (
    <div>
      <form onSubmit={handleSubmit(handleForm)}
      className='flex flex-col gap-3 lg:w-full w-[90%] mx-auto'>
     <div className='flex flex-row  gap-2'>
     <label className='w-[49%] '>
            <p className='lg:text-xl  font-semibold pb-1'>First Name</p>
            <input
             className='w-full border border-black outline-none p-3 rounded-md lg:text-xl'
              type="string"
              placeholder=''
             {...register("firstName")}
            />
          </label>

          <label className='w-[49%]'>
            <p className='lg:text-xl font-semibold pb-1'>Last Name</p>
            <input
             className='w-full border border-black outline-none p-3 rounded-md g:text-xl'
              type="string"
              placeholder=''
              {...register("lastName",)}
            />
            
          </label>

     </div>

     <div className='flex flex-row gap-2'>
     <label className='w-[49%]'>
            <p className='lg:text-xl font-semibold pb-1'>Select Gender</p>
            <select
              className='w-full border border-black outline-none p-3 rounded-md lg:text-xl'
              {...register("gender")}
            >
              {
                gender.map(gender => <option value={gender.gender}>{gender.gender}</option>)
              }
            </select>
          </label>

          <label className='w-[49%]'>
            <p className='lg:text-xl font-semibold pb-1'>Date Of Birth</p>
            <input
              className='w-full border border-black outline-none p-3 rounded-md lg:text-xl'
              type = "date"
              {...register("dateOfBirth")}
            >
            </input>
          </label>
     </div>

         <label className='w-[49%]'>
            <p className='lg:text-xl font-semibold pb-1'>Phone Number</p>
            <input
              className='w-full border border-black outline-none p-3 rounded-md lg:text-xl'
              type = "string"
              {...register("contactNumber")}
            >
            </input>
          </label>

          <label className='w-full'>
            <p className='lg:text-xl font-semibold '>About</p>
            <textarea
              type="string"
              className='w-full lg:h-[200px] border border-black outline-none p-3 rounded-md lg:text-xl'
              placeholder='Enter Product Details'
              {...register("about")}
            />
          </label>

          <button className='py-2 px-4 font-semibold bg-yellow-400 rounded-md text-black items-start lg:w-[20%] w-full'>Update</button>
      </form>

     
    </div>
  )
}

export default ProfileInfo
