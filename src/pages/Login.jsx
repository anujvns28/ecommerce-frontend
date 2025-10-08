// src/components/Login.js
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../service/operation/auth';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {authLoading} = useSelector((state) => state.auth);


    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm();

    const handleLogin = async(data) => {
       const result = await login(data,navigate,dispatch)

    }

    if(authLoading){
      return <div className='h-screen w-screen flex items-center text-black justify-center'>
       <div className='custom-loader'></div>
      </div>
    }  

  return (
    <div className="sm:min-h-screen h-[75vh] overflow-y-hidden flex items-center justify-center bg-gray-100">
      <div className="sm:w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className=" text-blue-800 text-xs">Email is required</span>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-blue-800">Password is required</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <span
              onClick={() => navigate("/forgot-password")}
              className="inline-block cursor-pointer align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Forgot Password?
            </span>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-700">
              Don't have an account?
              <span
                onClick={() => navigate("/signup")}
                className="text-blue-500 hover:text-blue-800 font-bold cursor-pointer"
              >
                Sign up
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
