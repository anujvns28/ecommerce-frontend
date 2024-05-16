const BASE_URL = process.env.REACT_APP_BASE_URL

export const authEndPoints = {
    GET_OTP : BASE_URL + "/auth/sendOtp",
    SIGN_UP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
    FORGOTPASSWORDTOKEN_API : BASE_URL + "/auth/forgotPasswordToken",
    FORGOTPASSWORD_API : BASE_URL + "/auth/forgotPassword"
}