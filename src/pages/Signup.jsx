// src/components/Signup.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthLoading, setUser } from '../slice/auth';
import toast from 'react-hot-toast';

const Signup = () => {
    const navigate = useNavigate();
    const {user,authLoading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const {
        register
        ,handleSubmit,
        formState:{errors}
    } = useForm();

    const handleSignup = async(data) => {
        console.log(data)
        dispatch(setUser(data))
        dispatch(setAuthLoading(true))
        toast.loading("loading..")
     }

    if(authLoading){
      return <div className='h-screen w-screen flex items-center text-black justify-center'>
       <div className='custom-loader'></div>
      </div>
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Create Your Account</h2>
        <form onSubmit={handleSubmit(handleSignup)}>
          <div className='flex flex-row gap-2'>
          <div className="mb-4">
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              id="password"
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">Confirm Password</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              id="confirm-password"
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
