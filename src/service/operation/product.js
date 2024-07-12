import toast from "react-hot-toast";
import { productEndPoints } from "../api";
import { apiConnector } from "../apiconnecter";
import { setProductLoading } from "../../slice/Product";
import { setUserLoading } from "../../slice/user";


const { 
  GET_SINGLE_PRODUCT_API, 
  CREATE_PRODUCT_API,
  GET_USER_PRODUCTS_API ,
  CHANGE_DISCOUNT_API,
  UPDATE_PRODUCT_API,
  DELETE_PRODUCT_API,
  CREATE_RATING_API,
  GET_RATING_AND_REVIEW_API,
   SEARCH_PRODUCT_API
} = productEndPoints;



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


export const createProduct = async (data,dispatch,navigate) => {
  dispatch(setProductLoading(true))
  try {
    const response = await apiConnector(
      "POST",
      CREATE_PRODUCT_API,
      data,
      {
        "Content-Type": "multipart/form-data",
      }
    );
    console.log("crating product resonse data", response);
    toast.success("Created successfully")
    navigate("/products")
  }
  catch (error) {
    console.log("updating profile img api error....", error);
    toast.error("Error in crating produt")
  }
  dispatch(setProductLoading(false))
}


export const getUserProducts = async (data,dispatch) => {
  dispatch(setUserLoading(true))
  let result = []
  try {
    const response = await apiConnector("POST", GET_USER_PRODUCTS_API, { userId: data })
    console.log("user products api response", response)
    result = response.data
  } catch (err) {
    console.log("user products  fetching  API ERROR....", err);
  }
  dispatch(setUserLoading(false))
  return result
}

export const changeDiscountPrice = async (data,dispatch) => {
  dispatch(setProductLoading(true))
  try {
    const response = await apiConnector("POST", CHANGE_DISCOUNT_API, data)
    console.log("change discount response", response)
    toast.success("Updated successfully")
  } catch (err) {
    console.log("change discount response API ERROR....", err);
  }
  dispatch(setProductLoading(false))
}

export const editProduct = async (data,dispatch) => {
  dispatch(setProductLoading(true))
  try {
    const response = await apiConnector("POST",
       UPDATE_PRODUCT_API,
        data,
        {
          "Content-Type": "multipart/form-data",
        }
      )
    console.log("UPdate product response", response)
    toast.success("Updated successfully")
  } catch (err) {
    console.log("UPdate product response API ERROR....", err);
  }
  dispatch(setProductLoading(false))
}

export const deleteProduct = async (data,dispatch) => {
  dispatch(setUserLoading(true))
  try {
    const response = await apiConnector("POST", DELETE_PRODUCT_API, data)
    console.log("delete product response", response)
    toast.success("Deleted  successfully")
  } catch (err) {
    console.log("delete product response API ERROR....", err);
  }
  dispatch(setUserLoading(false))
}


// create a rating for course
export const createRating = async (data) => {
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data)
    console.log("CREATE RATING API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating")
    }
    toast.success("Rating Created")
  } catch (error) {
  
    console.log("CREATE RATING API ERROR............", error)
    toast.error(error.response.data.message)
  }
}


export const getRatingAndReview = async (data) => {
  let result;
  try {
    const response = await apiConnector("POST", GET_RATING_AND_REVIEW_API, {productId:data})
    // console.log("get RATING API RESPONSE............", response)
    result = response.data
    if (!response?.data?.success) {
      throw new Error("Could Not get Rating")
    }
  } catch (error) {
  
    console.log("get RATING API ERROR............", error)
  }
  return result
}

export const serachProduct = async (data) => {
  let result
  try {
    const response = await apiConnector("POST", SEARCH_PRODUCT_API, {userInput:data});
    // console.log("search product response", response)
    result = response.data
  } catch (err) {
    console.log("search product response API ERROR....", err);
  }
 return result
}