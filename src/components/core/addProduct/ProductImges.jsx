import React, { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { setProductCreatingSteps, setProductInformation } from '../../../slice/Product';
import { set, useForm } from 'react-hook-form';
import { RxCross2 } from "react-icons/rx";
import { createProduct, editProduct } from '../../../service/operation/product';
import { useNavigate } from 'react-router-dom';

const ProductImges = () => {
  const [imageCount, setImageCount] = useState([]);
  const [mainImageUrl, setMainImageUrl] = useState();
  const [mainImageFile, setMainImageFile] = useState();
  const [editedImage,setEditedImage] = useState([-1]);
  const {productInformation,productLoading,isEdit} = useSelector((state)=> state.product);
  const {user} = useSelector((state) => state.profile)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleImage = () => {
    const images = [...imageCount];
    images.push( { id: imageCount.length, url: null, file: null })
    setImageCount(images);
  }

  const handleMainImg = (e) => {
    const image = e.target.files[0];
    setMainImageUrl(URL.createObjectURL(image));
    setMainImageFile(image);
  }

  const handleSubImages = (e, count) => {
    if(isEdit){
      const data = [...editedImage]
      data.push(count)
     setEditedImage(data);
    }
    const image = e.target.files[0];
    const dum = [...imageCount];
    dum[count].url = URL.createObjectURL(image)
    dum[count].file = image
    setImageCount(dum)
  }

  const changeSubImages = (count) => {
    const dum = [...imageCount];
    dum[count].url = null
    dum[count].file = null
    setImageCount(dum)
  }

  
  const handleCreateProduct = async(e) => {
    e.preventDefault()

    const data = {
      ...productInformation,
      mainImage : mainImageFile,
      productsImages: imageCount,
      userId : user._id
    }

    if(isEdit){
      const editedData = {
        ...productInformation,
        mainImage : mainImageFile,
        productsImages: imageCount,
        editedImage : editedImage,
      }
      console.log(editedData,"this is edtind dataa")
      await editProduct(editedData,dispatch)
      return
    }

    await createProduct(data,dispatch,navigate);
    dispatch(setProductCreatingSteps(1))
    dispatch(setProductInformation(null))
   
  }

  useEffect(() => {
    let dum = [
      { id: 0, url: null, file: null },
      { id: 1, url: null, file: null },
      { id: 2, url: null, file: null },
      { id: 3, url: null, file: null },
      
    ]
    setImageCount(dum)

    if(productInformation.mainImage){
        if(!isEdit){
          setImageCount(productInformation.subImages)
          setMainImageUrl(URL.createObjectURL(productInformation.mainImage))
        }else{
          setMainImageUrl(productInformation.mainImage)
          const data =  productInformation.productsImages.map((item,index) => {
            return { id:index , url: item, file: null }
        })
        setImageCount(data)
        }
    }
  }, [])


  if(productLoading){
    return <div className='h-screen w-screen flex items-center text-black justify-center'>
     <div className='custom-loader'></div>
    </div>
  }  

 
  return (
    <div class="flex items-center justify-center w-[1000px] mx-auto max-w-[90%] ">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full pb-12 flex flex-col ">
        <h2 class="text-2xl font-bold pb-4 text-center">Select Shouse Images</h2>

        <form onSubmit={(e) => handleCreateProduct(e)}>
          <p className='block text-sm font-medium text-blue-600 pb-2 '>Shouse main image</p>
          <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 -z-10">
            {
              mainImageUrl
                ? <div className='h-60 border-2 relative '>
                  <div onClick={() => setMainImageUrl(null)}
                    className='w-[30px] h-[30px] flex items-center justify-center cursor-pointer
                text-2xl border bg-yellow-400 text-green-500 rounded-full absolute right-1 top-1'>
                    <RxCross2 />
                  </div>
                  <img className='w-full h-full  object-fill '
                    src={mainImageUrl} />
                </div>
                : <label class="flex items-center justify-center h-60 border-2 border-dashed border-blue-600  rounded cursor-pointer hover:bg-gray-100">
                  <span class="text-gray-600">Click to select an image</span>
                  <input
                    id="imageInput"
                    type="file"
                    class="hidden"
                    onChange={(e) => handleMainImg(e)}
                  />
                </label>
            }
          </div>

          {/* subimages */}
          <div className='pt-5'>
            <p className='block text-sm font-medium text-blue-600 pb-2 '>Shouse  images</p>
            <div className=' flex flex-row items-center w-full  gap-3 flex-wrap'>

              {
                imageCount.map((item) => {
                  return <div className=' h-full'>
                    <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
                      {
                        item.url
                          ? <div className='w-60 h-60 border-2 relative '>
                            <div onClick={() => changeSubImages(item.id)}
                              className='w-[30px] h-[30px] flex items-center justify-center cursor-pointer
                text-2xl border bg-yellow-400 text-green-500 rounded-full absolute right-1 top-1'>
                              <RxCross2 />
                            </div>
                            <img className='w-full h-full  object-fill '
                              src={item.url} />
                          </div>
                          :  <label class="flex items-center justify-center w-60 h-60 border-2 border-dashed border-blue-600 rounded cursor-pointer hover:bg-gray-100">
                          <span class="text-gray-600">Click to select an image {item.id + 1}</span>
                          <input 
                          id="imageInput" 
                          type="file" class="hidden"
                          onChange={(e) => handleSubImages(e,item.id)}
                          />
                        </label>
                      }
                    </div>
                  </div>

                })
              }
              <div className='w-60 h-60 flex items-center justify-center' >
                <div className=' rounded-full w-28 h-28 flex flex-col text-2xl items-center justify-center border-2 border-dashed border-blue-600 cursor-pointer hover:bg-gray-100'
                  onClick={handleImage}>
                  <FaPlus />
                  <p className='text-xl'>Image</p>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-row gap-2 w-full justify-end top-4 h-fit items-center'>
            <div onClick={() => dispatch(setProductCreatingSteps(2))} class="flex justify-end">
              <button class="bg-blue-500 h-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Back</button>
            </div>
           
            <div class="flex justify-end">
              <button
                type='submit'
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">{isEdit ? "Edit Product" : 'Create Product'}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductImges
