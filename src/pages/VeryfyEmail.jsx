import React from 'react'

const VeryfyEmail = () => {
  return (
    <div class="bg-gray-100 min-h-screen flex items-center justify-center">
  <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
    <h2 class="text-2xl font-bold mb-6 text-gray-900 text-center">OTP Verification</h2>
    <form>
      <div class="mb-6">
        <label for="otp" class="block text-sm font-medium text-gray-700">Enter OTP</label>
        <input
          id="otp"
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your OTP"
          required
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
