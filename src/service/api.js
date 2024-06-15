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
    GET_SINGLE_PRODUCT_API : BASE_URL + "/product/getSingleProduct",
    CREATE_PRODUCT_API : BASE_URL + "/product/create-product",
    GET_USER_PRODUCTS_API : BASE_URL + "/product/userProducts",
    CHANGE_DISCOUNT_API : BASE_URL + "/product/changeDiscount",
    UPDATE_PRODUCT_API : BASE_URL + "/product/editProduct"
}

export const profileEndPoints = {
    UPDATE_PROFILE_API : BASE_URL + "/auth/updateProfile",
    UPDATE_PROFILE_IMG : BASE_URL + "/auth/updateProfileImg",
    ADD_ADDRESS : BASE_URL + "/auth/addAddress",
    DELETE_ADDRESS : BASE_URL + "/auth/deleteAddres",
    EDIT_ADDRESS : BASE_URL + "/auth/editAddress",
    UPDATE_PASSWORD : BASE_URL + "/auth/updatePassword"
}