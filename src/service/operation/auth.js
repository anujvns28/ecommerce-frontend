import toast from "react-hot-toast";
import { setAuthLoading, setToken } from "../../slice/auth";
import { authEndPoints } from "../api";
import { apiConnector } from "../apiconnecter";
import { setUser } from "../../slice/user";



const {
    GET_OTP,
    SIGN_UP_API,
    LOGIN_API,
    SEND_RESET_PASSWORD_MAIL,
    RESET_PASSWORD_API
} = authEndPoints

export const getOtp = async (email,navigate,dispatch) => {
    dispatch(setAuthLoading(true))
    try {
        const response = await apiConnector("POST", GET_OTP,{email:email});
        console.log("otp response", response);
        toast.success("Otp Sent successfully")
        navigate("/verify-email");
    }
    catch (error) {
        console.log("OTP RESPONSE  API ERROR....", error);
        toast.error(error.response.data.message)
    }
    dispatch(setAuthLoading(false))
}

export async function signUp(data,navigate,dispatch) {
    dispatch(setAuthLoading(true))
    try {
      const response = await apiConnector("POST", SIGN_UP_API, data)

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setAuthLoading(false))
  }


  export async function login(data,navigate,dispatch) {
    dispatch(setAuthLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, data)

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Login Successful")
      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
      localStorage.setItem("token",JSON.stringify(response.data.token))
      localStorage.setItem("user",JSON.stringify(response.data.user))
      navigate("/")

    } catch (error) {
      console.log("login API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setAuthLoading(false))
  }  

  // log out

export const logout = (dispatch,navigate) =>{
  dispatch(setToken(null))
  dispatch(setUser(null))
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  
  toast.success("Loghout Successfully")
  navigate("/")
}


/// send reset password mail
export const sendResetPassordMail = async (email,dispatch) => {
  dispatch(setAuthLoading(true))
  try {
      const response = await apiConnector("POST", SEND_RESET_PASSWORD_MAIL,{email:email});
      console.log("otp response", response);
      toast.success("Mail send successfully")
  }
  catch (error) {
      console.log("reset password  API ERROR....", error);
      toast.error(error.response.data.message)
  }
  dispatch(setAuthLoading(false))
}

/// send reset password mail
export const resetPassword = async (data,dispatch,navigate) => {
  dispatch(setAuthLoading(true))
  try {
      const response = await apiConnector("POST", RESET_PASSWORD_API,data);
      console.log("reset Password response", response);
      toast.success("Reset successfully")
      navigate("/login")
  }
  catch (error) {
      console.log("reset password  API ERROR....", error);
      toast.error(error.response.data.message)
  }
  dispatch(setAuthLoading(false))
}