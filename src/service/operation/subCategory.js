import { subCtegoryEndPoints } from "../api"
import { apiConnector } from "../apiconnecter"

const {
    GET_CATEGORY_SUBCATEGORY
} = subCtegoryEndPoints

export const getAllSubCategories = async(categoryId) =>{
    let result =[]
    try{
     const response = await apiConnector("POST",GET_CATEGORY_SUBCATEGORY,{categoryId:categoryId})
  
     console.log("Categories SubCategory api response",response)
     result = response.data.subCategoryes
    }catch(err){
      console.log("All Categories SubCategory fetching  API ERROR....", err);
    }
    return result
  }