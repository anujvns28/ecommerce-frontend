import { productEndPoints } from "../api";
import { apiConnector } from "../apiconnecter";


const {GET_SINGLE_PRODUCT_API} = productEndPoints;



export const getSignleProductInfo = async(data) =>{
 
    let result =[]
    try{
     const response = await apiConnector("POST",GET_SINGLE_PRODUCT_API,{productId:data})
     console.log("single product info api response",response)
     result = response.data
    }catch(err){
      console.log("single product info  fetching  API ERROR....", err);
    }
    return result 
  }