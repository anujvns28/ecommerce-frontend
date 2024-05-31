const BASE_URL = process.env.REACT_APP_BASE_URL

export const authEndPoints = {
    GET_OTP : BASE_URL + "/auth/sendOtp",
    SIGN_UP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
    FORGOTPASSWORDTOKEN_API : BASE_URL + "/auth/forgotPasswordToken",
    FORGOTPASSWORD_API : BASE_URL + "/auth/forgotPassword"
}

export const categoryEndPoints = {
    GET_ALL_CATEGORY_API : BASE_URL + "/category/fetchallCategory",
    FETCH_CATEGORY_INFO_API : BASE_URL + "/category/categoryInfo"
}

export const subCtegoryEndPoints = {
    GET_CATEGORY_SUBCATEGORY : BASE_URL + "/subCategory/fetchallSubCategory",
    FETCH_SUBCATEGORY_WISE_PRODUCT_API: BASE_URL + "/subCategory/subCategoryProduct"
}

export const productEndPoints = {
    GET_SINGLE_PRODUCT_API : BASE_URL + "/product/getSingleProduct"
}