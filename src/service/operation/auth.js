import { setAuthLoading } from "../../slice/auth";
import { authEndPoints } from "../api";



const {
    GET_OTP,
    SIGN_UP_API,
    LOGIN_API,
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