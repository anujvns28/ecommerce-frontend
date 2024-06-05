import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { addAddress, editAddress } from '../../../service/operation/profile';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';


const AddAddress = ({setAddAddress,addressData}) => {
    const {user,userLoading} = useSelector((state) => state.profile);
    const { register, setValue, getValues,reset, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const handleForm = async (data) => {
       
      if(!addressData){
        console.log(data)
        await addAddress(data,dispatch);
        setAddAddress(false);
      }else{
        if(isUpdated()){
            await editAddress(data,dispatch);
            setAddAddress(false)
        }else{
            toast.error("no updation made")
        }
      }
    }
    
    const isUpdated = () => {
      if(getValues("name") !==addressData.name ||
        getValues("phoneNumber") !==addressData.phoneNumber ||
        getValues("pincode") !==addressData.pincode ||
        getValues("locality") !==addressData.locality ||
        getValues("address") !==addressData.address ||
        getValues("city") !==addressData.city ||
        getValues("landmark") !==addressData.landmark ||
        getValues("alternatePhoneNumber") !==addressData.alternatePhoneNumber ||
        getValues("state") !==addressData.state ){
        return true
    }else return false
    }

    useEffect(() => {
      if(addressData){
        setValue("name",addressData.name)
        setValue("phoneNumber",addressData.phoneNumber)
        setValue("pincode",addressData.pincode)
        setValue("locality",addressData.locality)
        setValue("address",addressData.address)
        setValue("city",addressData.city)
        setValue("landmark",addressData.landmark)
        setValue("alternatePhoneNumber",addressData.alternatePhoneNumber)
        setValue("state",addressData.state)
        setValue("addresId",addressData._id)
      }else{
        reset();
      }
    },[addressData])

    useEffect(() => {
        setValue("userId",user._id);
    },[])
    

    return (
        <div className='w-full h-full'>
          {
            userLoading ? 
            <div className='w-full h-[300px] flex items-center  justify-center'>
                <div className='custom-loader'></div>
            </div>
            :  <form onSubmit={handleSubmit(handleForm)} >
            <label className='w-[49%]'>
                <p className='lg:text-xl font-semibold pb-1'>Name</p>
                <input
                    className='w-full border border-black outline-none p-3 rounded-md lg:text-xl'
                    type="string"
                    placeholder='Enter Your Name'
                    {...register("name", { required: true })}
                />
                {
                    errors.name && <div>
                        <p className='text-blue-500'>name is required</p>
                    </div>
                }
            </label>

            <label className='w-[49%]'>
                <p className='lg:text-xl font-semibold pb-1'>Mobile Number</p>
                <input
                    className='w-full border border-black outline-none p-3 rounded-md lg:text-xl'
                    type="string"
                    placeholder='Enter Phone Number'
                    {...register("phoneNumber", { required: true })}
                />
                {
                    errors.phoneNumber && <div>
                        <p className='text-blue-500'>phoneNumber is required</p>
                    </div>
                }
            </label>

            <label className='w-[49%]'>
                <p className='lg:text-xl font-semibold pb-1'>Pincode</p>
                <input
                    className='w-full border border-black outline-none p-3 rounded-md lg:text-xl'
                    type="string"
                    placeholder='Enter Pincode'
                    {...register("pincode", { required: true })}
                />
                {
                    errors.pincode && <div>
                        <p className='text-blue-500'>pincode is required</p>
                    </div>
                }
            </label>

            <label className='w-[49%]'>
                <p className='lg:text-xl font-semibold pb-1'>Locality</p>
                <input
                    className='w-full border border-black outline-none p-3 rounded-md lg:text-xl'
                    type="string"
                    placeholder='Locality'
                    {...register("locality", { required: true })}
                />
                {
                    errors.locality && <div>
                        <p className='text-blue-500'>locality is required</p>
                    </div>
                }
            </label>

            <label className='w-full'>
                <p className='lg:text-xl font-semibold '>Address</p>
                <textarea
                    type="string"
                    className='w-full lg:h-[200px] border border-black outline-none p-3 rounded-md lg:text-xl'
                    placeholder='Enter Address'
                    {...register("address", { required: true })}
                />
                {
                    errors.address && <div>
                        <p className='text-blue-500'>address is required</p>
                    </div>
                }
            </label>

            <label className='w-[49%]'>
                <p className='lg:text-xl font-semibold pb-1'>City</p>
                <input
                    className='w-full border border-black outline-none p-3 rounded-md lg:text-xl'
                    type="string"
                    placeholder='City'
                    {...register("city", { required: true })}
                />
                {
                    errors.city && <div>
                        <p className='text-blue-500'>city is required</p>
                    </div>
                }
            </label>

            <label className='w-[49%]'>
                <p className='lg:text-xl font-semibold pb-1'>State</p>
                <input
                    className='w-full border border-black outline-none p-3 rounded-md lg:text-xl'
                    type="string"
                    placeholder='State'
                    {...register("state", { required: true })}
                />
                {
                    errors.state && <div>
                        <p className='text-blue-500'>state is required</p>
                    </div>
                }
            </label>

            <label className='w-[49%]'>
                <p className='lg:text-xl font-semibold pb-1'>LandMark</p>
                <input
                    className='w-full border border-black outline-none p-3 rounded-md lg:text-xl'
                    type="string"
                    placeholder='landmark'
                    {...register("landmark", { required: true })}
                />
                {
                    errors.landmark && <div>
                        <p className='text-blue-500'>landMark is required</p>
                    </div>
                }
            </label>

            <label className='w-[49%]'>
                <p className='lg:text-xl font-semibold pb-1'>Alternate PhoneNumber</p>
                <input
                    className='w-full border border-black outline-none p-3 rounded-md lg:text-xl'
                    type="string"
                    placeholder='Phone Number(Optional)'
                    {...register("alternatePhoneNumber", { required: true })}
                />
                {
                    errors.alternatePhoneNumber && <div>
                        <p className='text-blue-500'>alternatePhoneNumber is required</p>
                    </div>
                }
            </label>

            <button className='px-3 py-2  bg-yellow-400 rounded-md mt-2'>{addressData ? "Edit":"submit"}</button>

        </form>
          }
        </div>
    )
}

export default AddAddress
