import toast from "react-hot-toast";
import { setUser, setUserLoading } from "../../slice/user";
import { profileEndPoints } from "../api";
import { apiConnector } from "../apiconnecter";


const {UPDATE_PROFILE_API,
  UPDATE_PROFILE_IMG,
  ADD_ADDRESS,
  DELETE_ADDRESS,
  EDIT_ADDRESS,
  UPDATE_PASSWORD
} = profileEndPoints;


// update profile
export const updateUserProfile = async(data,dispatch) =>{
    dispatch(setUserLoading(true))
    try{ 
     const response = await apiConnector("POST",UPDATE_PROFILE_API,data);
     console.log("update profile api response",response.data.data);
     dispatch(setUser(response.data.data))
     localStorage.setItem("user",JSON.stringify(response.data.data));
    }catch(err){
      console.log("update profile api response  API ERROR....", err);
      toast.error("try again")
    }
    dispatch(setUserLoading(false))
  }


  // updae image
  export const updateProfileImg = async (data,dispatch) => {
    dispatch(setUserLoading(true))
    try {
        const response = await apiConnector(
            "POST",
             UPDATE_PROFILE_IMG ,
              data,
              {
                "Content-Type": "multipart/form-data",
              }
              );
        console.log("updating profile image resonse data", response.data.data);
        dispatch(setUser(response.data.data));
        localStorage.setItem('user',JSON.stringify(response.data.data))
    }
    catch (error) {
        console.log("updating profile img api error....", error);
        toast.error("Error in UPdating")
    }
    dispatch(setUserLoading(false))
}

export const addAddress = async(data,dispatch) =>{
  dispatch(setUserLoading(true))
  try{ 
   const response = await apiConnector("POST",ADD_ADDRESS,data);
   console.log("add address api response",response.data.data);
   dispatch(setUser(response.data.data))
   localStorage.setItem("user",JSON.stringify(response.data.data));
  }catch(err){
    console.log("add address api response  API ERROR....", err);
    toast.error("try again")
  }
  dispatch(setUserLoading(false))
}


export const deleteAddress = async(data,dispatch) =>{
  dispatch(setUserLoading(true))
  try{ 
   const response = await apiConnector("POST",DELETE_ADDRESS,data);
   console.log("delete address api response",response.data.data);
   dispatch(setUser(response.data.data))
   localStorage.setItem("user",JSON.stringify(response.data.data));
  }catch(err){
    console.log("delete address api response  API ERROR....", err);
    toast.error("try again")
  }
  dispatch(setUserLoading(false))
}

export const editAddress = async(data,dispatch) =>{
  dispatch(setUserLoading(true))
  try{ 
   const response = await apiConnector("POST",EDIT_ADDRESS,data);
   console.log("edit address api response",response.data.data);
   dispatch(setUser(response.data.data))
   localStorage.setItem("user",JSON.stringify(response.data.data));
  }catch(err){
    console.log("edit address api response  API ERROR....", err);
    toast.error("try again")
  }
  dispatch(setUserLoading(false))
}


export const updatePassword = async(data,dispatch) =>{
  dispatch(setUserLoading(true))
  try{ 
   const response = await apiConnector("POST",UPDATE_PASSWORD,data);
   console.log("update password api response",response.data);
   toast.success("successfull")
 
  }catch(err){
    console.log("update password api response  API ERROR....", err);
    toast.error("try again")
  }
  dispatch(setUserLoading(false))
}