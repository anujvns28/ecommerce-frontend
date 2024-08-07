import { categoryEndPoints } from "../api"
import { apiConnector } from "../apiconnecter"

const {
    GET_ALL_CATEGORY_API,
    FETCH_CATEGORY_INFO_API
} = categoryEndPoints

export const getAllCategories = async() =>{
 
    let result
    try{
     const response = await apiConnector("GET",GET_ALL_CATEGORY_API,)
     console.log("CAtegory api response",response)
     result = response.data
    }catch(err){
      console.log("All Category fetching  API ERROR....", err);
    }
    return result 
  }


  export const CategoryInfo = async(data) =>{
 
    let result =[]
    try{
     const response = await apiConnector("POST",FETCH_CATEGORY_INFO_API,{categoryId:data})
     //console.log("CAtegory info api response",response)
     result = response.data
    }catch(err){
      console.log("Category info fetching  API ERROR....", err);
    }
    return result 
  }