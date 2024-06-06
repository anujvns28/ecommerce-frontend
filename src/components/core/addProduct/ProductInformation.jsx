import React from 'react'
import { ProColor, gender, size } from '../../../data/filterData'

const ProductInformation = () => {
    return (
        <div class="min-h-screen flex items-center justify-center w-[1000px] mx-auto max-w-[90%]">
            <div class="bg-white p-8 rounded-lg shadow-lg w-full ">
                <h2 class="text-2xl font-bold pb-4 text-center">Product Information</h2>
                <form   class="space-y-4 w-full">
                    <div>
                        <label for="productName" class="block text-sm font-medium text-gray-700">Product Name</label>
                        <input type="text" id="productName" name="productName" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter product name" required />
                    </div>

                    <div>
                        <label for="productDescription" class="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="productDescription" name="productDescription" rows="4" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter product description" required></textarea>
                    </div>

                    <div className='flex flex-row gap-3 '>
                        <div className='w-full'>
                            <label for="productPrice" class="block text-sm font-medium text-gray-700">Price (₹)</label>
                            <input 
                            type="number" 
                            name="productPrice" 
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter product price" required />
                        </div>

                        <div className='w-full'>
                            <label for="productPrice" class="block text-sm  w-full font-medium text-gray-700">Price (₹)</label>
                            <input 
                            type="number" 
                            name="productPrice" 
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter product price" required />
                        </div>
                    </div>


                    <div>
                        <label for="productGender" class="block text-sm font-medium text-gray-700">Gender</label>
                        <select id="productGender" name="productGender" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select Category</option>
                           {gender.map(item =>  <option value={item.gender}>{item.gender}</option>)}
                        </select>
                    </div>

                    <div>
                        <label for="productColor" class="block text-sm font-medium text-gray-700">Color</label>
                        <select id="productColor" name="productColor" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Select Company</option>
                            {ProColor.map(item =>  <option value={item.colorName}>{item.colorName}</option>)}
                        </select>
                    </div>

                    <div>
                        <label for="productSize" class="block text-sm font-medium text-gray-700">Size</label>
                        <div className='flex flex-row flex-wrap gap-3 mt-1'>
                        {
                            size.map((item) =>{
                                return  <div className='w-[120px] text-center p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none hover:ring-blue-500 hover:border-blue-500'>{item.size}</div>
                            })
                         }
                        </div>
                    </div>

                    <div class="flex justify-end">
                        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Create Product</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductInformation
