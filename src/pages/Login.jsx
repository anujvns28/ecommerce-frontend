// src/components/Login.js
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth);

  console.log(user,"user..")

    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm();

    const handleLogin = async(data) => {
       console.log(data)
       toast.success("heeloo")
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Login to Your Account</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              type="password"
              placeholder="Enter your password"
              {...register("password",{required:true})}
            />
            {
                errors.password && 
                <span className='text-blue-800'>Password is required</span>
            }
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <span
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              
            >
              Forgot Password?
            </span>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-700">Don't have an account?
             <span onClick={()=> navigate("/signup")}
              className="text-blue-500 hover:text-blue-800 font-bold cursor-pointer">Sign up</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
