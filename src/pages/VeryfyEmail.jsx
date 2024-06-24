import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../service/operation/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const VeryfyEmail = () => {
  const {signupData,authLoading} = useSelector((state) => state.auth);
  const [otp,setOtp] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async() => {
  const data = {
    ...signupData,
    otp:otp,
   
  }
  console.log(data)
  await signUp(data,navigate,dispatch)

  }

  

  
  useEffect(() => {
    if(!signupData){
       toast.error("Error..")
       navigate("/signup")
    }
   },[])

   if(authLoading){
    return <div className='h-screen w-screen flex items-center text-black justify-center'>
     <div className='custom-loader'></div>
    </div>
  }


  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
  <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
    <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">OTP Verification</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
        <input
          id="otp"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your OTP"
          onChange={(e)=> setOtp(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Verify OTP
        </button>
      </div>
    </form>
  </div>
</div>
  )
}

export default VeryfyEmail
