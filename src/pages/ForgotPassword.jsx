import React, { useState } from 'react'
import { sendResetPassordMail } from '../service/operation/auth';
import { useDispatch, useSelector } from 'react-redux';

const ForgotPassword = () => {
    const [email,setEmail] = useState();
    const {authLoading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleClick = async() => {
        await sendResetPassordMail(email,dispatch);
    }

    if(authLoading){
        return <div className='h-screen w-screen flex items-center text-black justify-center'>
         <div className='custom-loader'></div>
        </div>
      }

  return (
    <div className="bg-gray-100 flex items-center justify-center lg:min-h-[90vh] min-h-[56vh]">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
     
        <div className="mb-4">
          <label for="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
          <input 
          onChange={(e)=> setEmail(e.target.value)}
          type="email" 
          placeholder='Enter email'
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required
          />
        </div>
        <button onClick={handleClick}
         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Send Reset Mail</button>
    </div>
  </div>
  )
}

export default ForgotPassword
