import { subCtegoryEndPoints } from "../api"
import { apiConnector } from "../apiconnecter"

const {
    GET_CATEGORY_SUBCATEGORY,
    FETCH_SUBCATEGORY_WISE_PRODUCT_API
} = subCtegoryEndPoints

export const getAllSubCategories = async(categoryId) =>{
    let result =[]
    try{
     const response = await apiConnector("POST",GET_CATEGORY_SUBCATEGORY,{categoryId:categoryId})
  
     //console.log("Categories SubCategory api response",response)
     result = response.data.subCategoryes
    }catch(err){
      console.log("All Categories SubCategory fetching  API ERROR....", err);
    }
    return result
  }


  export const getAllSubCategoriesProduct = async(data) =>{
    let result =[]
    try{
     const response = await apiConnector("POST",FETCH_SUBCATEGORY_WISE_PRODUCT_API,{subCategoryId:data})
  
     //console.log(" SubCategory product api response",response)
     result = response.data
    }catch(err){
      console.log(" SubCategory product fetching  API ERROR....", err);
    }
    return result
  }