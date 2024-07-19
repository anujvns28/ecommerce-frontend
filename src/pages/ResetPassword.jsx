import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../service/operation/auth';

const ResetPassword = () => {
    const [formData, setFormData] = useState();
    const { authLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useParams();
    const { register,handleSubmit,setValue, formState: { errors } } = useForm();

    const handleRestPassword = async(data) => {
       const formData = {
        ...data,
        token:token
       }
       if(data.password !== data.confirmPassword){
        toast.error("Password not matched")
       }else{
           await resetPassword(formData,dispatch,navigate);
       }
    }

    if(authLoading){
        return <div className='h-screen w-screen flex items-center text-black justify-center'>
         <div className='custom-loader'></div>
        </div>
      }  

    return (
        <div className="bg-gray-100 flex items-center justify-center lg:min-h-[90vh] min-h-[56vh]">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
                <form onSubmit={handleSubmit(handleRestPassword)}>
                <div className="mb-4">
                    <label for="new-password" className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
                    <input
                        type="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        {...register("password", { required: true })}
                    />
                    {
                        errors.password &&
                        <span className=' text-blue-800'>Password is required</span>
                    }
                </div>
                <div className="mb-4">
                    <label for="confirm-password" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                    <input
                        type="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        {...register("confirmPassword", { required: true })}
                    />
                    {
                        errors.confirmPassword &&
                        <span className=' text-blue-800'>Confirm Password is required</span>
                    }
                </div>
                <button type='submit'
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Reset Password</button>
                </form>

            </div>
        </div>
    )
}

export default ResetPassword
