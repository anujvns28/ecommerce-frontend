import React from 'react'
import { useForm } from 'react-hook-form';

const UpdatePassword = () => {
    const { register, setValue, getValues,reset, handleSubmit, formState: { errors } } = useForm();
  return (
    
  <div class=" flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg  w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Update Password</h2>
      <form>
        <div class="mb-4">
          <label for="current-password" class="block text-gray-700 font-medium mb-2">Current Password</label>
          <input type="password" id="current-password" class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500" required/>
        </div>
        <div class="mb-4">
          <label for="new-password" class="block text-gray-700 font-medium mb-2">New Password</label>
          <input type="password" id="new-password" class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500" required/>
        </div>
        <div class="mb-6">
          <label for="confirm-password" class="block text-gray-700 font-medium mb-2">Confirm New Password</label>
          <input type="password" id="confirm-password" class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500" required/>
        </div>
        <button type="submit" class="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Update Password
        </button>
      </form>
    </div>
  </div>

  )
}

export default UpdatePassword
