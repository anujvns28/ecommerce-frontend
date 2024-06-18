import React, { useEffect, useState } from 'react'
import { getAllCategories } from '../../../service/operation/category';
import { useDispatch, useSelector } from 'react-redux';
import { setProductCreatingSteps, setProductInformation } from '../../../slice/Product';

const ProductCategory = () => {
    const [categoryId,setCategoryId] = useState();
    const [categories,setCategories] = useState();
    const [subCategories,setSubCategories] = useState();
    const [company,setCompany] = useState();

    const {productInformation} = useSelector((state) => state.product);
    const dispatch = useDispatch();

    const fetchCategory = async () => {
        const result = await getAllCategories();
        if (result) {
          const category = result.data.filter((item) => item.subCategories.length > 0);
          setCategories(category)
          
          if(productInformation){
            setCategoryId(productInformation.category);
        }else{
            setCategoryId(category[0]._id)
        }
        }
      }

    const handleNext = () => {
        dispatch(setProductCreatingSteps(2));
        
        if(productInformation){
          const data = {
            ...productInformation
           }
           data.category = categoryId
           data.subCategory = company
           
           dispatch(setProductInformation(data));
           return 
        }

        const data = {
            category : categoryId,
            subCategory : company
        }
        dispatch(setProductInformation(data));
    }

    useEffect(() => {
        fetchCategory();
    },[])

    useEffect(() => {
    if(categories){
        const companys = categories.filter((item) => item._id === categoryId);
        setSubCategories(companys[0].subCategories);
        setCompany(companys[0].subCategories[0]._id)
    }
    },[categoryId])

   
    return (
        <div class="flex items-center justify-center w-[1000px] mx-auto max-w-[90%] ">
            <div class="bg-white p-8 rounded-lg shadow-lg w-full pb-12">
                <h2 class="text-2xl font-bold pb-4 text-center">Select Category and Company</h2>
                 
                <div className='flex flex-col gap-2'>
                <div>
                    <label for="productGender" class="block text-sm font-medium text-gray-700">Select Category</label>
                    <select 
                    id="productGender" 
                    onChange={(e) => setCategoryId(e.target.value)}
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        {
                            !categories 
                            ?  <option value="">loading..</option>
                            : categories.map(item => 
                             <option 
                             selected={productInformation && productInformation.category == item._id }
                             value={item._id}>{item.categoryName}
                             </option>)   
                        }
                    </select>
                </div>

                <div>
                    <label for="productColor" class="block text-sm font-medium text-gray-700">Select Company</label>
                    <select 
                    id="productColor" 
                    onChange={(e) => setCompany(e.target.value)}
                    class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    {
                            !subCategories 
                            ?  <div>Loading...</div>
                            : subCategories.map(item =>  
                            <option 
                            selected={productInformation && productInformation.subCategory == item._id }
                            value={item._id}>{item.name}
                            </option>)   
                        }
                    </select>
                </div>
                </div>

               <div className='flex flex-row gap-2 w-full'>
               {
                productInformation && 
                <div class="flex justify-end my-8">
                    <button onClick={() => dispatch(setProductCreatingSteps(2))}
                    type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Continue without save</button>
                </div>

               }
                <div class="flex justify-end my-8">
                    <button onClick={handleNext}
                    type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Next</button>
                </div>
               </div>
            </div>
        </div>
    )
}

export default ProductCategory
