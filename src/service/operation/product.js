import toast from "react-hot-toast";
import { productEndPoints } from "../api";
import { apiConnector } from "../apiconnecter";


const { GET_SINGLE_PRODUCT_API, CREATE_PRODUCT_API } = productEndPoints;



export const getSignleProductInfo = async (data) => {

  let result = []
  try {
    const response = await apiConnector("POST", GET_SINGLE_PRODUCT_API, { productId: data })
    console.log("single product info api response", response)
    result = response.data
  } catch (err) {
    console.log("single product info  fetching  API ERROR....", err);
  }
  return result
}


export const createProduct = async (data) => {
  
  try {
    const response = await apiConnector(
      "POST",
      CREATE_PRODUCT_API,
      data,
      {
        "Content-Type": "multipart/form-data",
      }
    );
    console.log("crating product resonse data", response.data.data);
  }
  catch (error) {
    console.log("updating profile img api error....", error);
    toast.error("Error in crating produt")
  }

}