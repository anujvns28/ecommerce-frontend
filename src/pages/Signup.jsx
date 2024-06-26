// src/components/Signup.js
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setAuthLoading, setSignupData, setUser } from '../slice/auth';
import toast from 'react-hot-toast';
import { getOtp } from '../service/operation/auth';

const Signup = () => {
    const navigate = useNavigate();
    const {user,authLoading} = useSelector((state) => state.auth);
    const {isSellerAccount} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const [serarchParams,setSearchParams] = useSearchParams();

    const {
        register
        ,handleSubmit,
        setValue,
        formState:{errors}
    } = useForm();

    const handleSignup = async(data) => {
      if(data.password === data.confirmPassword){
        dispatch(setSignupData(data))
        await getOtp(data.email,navigate,dispatch);
      }else{
        toast.error("Password not matched")
      }
     }

     useEffect(() => {
      const account = serarchParams.get("account")
      console.log(account)
      if(account == "seller"){
        setValue("accountType","Seller")
      }else{
        setValue("accountType","Buyer")
      }
      
     },[])

     useEffect(() => {
      if(isSellerAccount){
        const params = new URLSearchParams(serarchParams);
        params.set('account', "seller");
        setSearchParams(params);
        setValue("accountType","Seller")
      }
     },[])

    if(authLoading){
      return <div className='h-screen w-screen flex items-center text-black justify-center'>
       <div className='custom-loader'></div>
      </div>
    }

  return (
    <div className="sm:min-h-screen h-[90vh] flex items-center justify-center bg-gray-100">
      <div className="sm:w-full w-[90%] max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Create Your Account</h2>
        <form onSubmit={handleSubmit(handleSignup)}>
          <div className='flex sm:flex-row flex-col gap-2'>
          <div className="sm:mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" >First Name</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter your first name"
              {...register("firstName", { required: true })}
            />
            {
                errors.firstName && 
                <span className=' text-blue-800'>First Name is required</span>
            }
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" >Last Name</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter your last name"
              {...register("lastName", { required: true })}
            />
            {
                errors.lastName && 
                <span className=' text-blue-800'>Last Name is required</span>
            }
          </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" >Email</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Enter your email"
              {...register("email",{required:true})}
            />
{
                errors.email && 
                <span className=' text-blue-800'>Email is required</span>
            }
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" >Password</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Enter your password"
              {...register("password",{required:true})}
            />
            {
                errors.password && 
                <span className=' text-blue-800'>Password is required</span>
            }
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" >Confirm Password</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword",{required:true})}
            />
            {
                errors.confirmPassword && 
                <span className=' text-blue-800'>Password is required</span>
            }
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
            <span
            onClick={() => navigate("/login")}
              className="inline-block align-baseline cursor-pointer font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Already have an account?
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
