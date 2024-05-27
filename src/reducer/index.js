import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "../slice/auth"
import profileReducer from "../slice/user"
import productReducer from "../slice/Product"

const rootReducer = combineReducers({
    auth : authReducer,
    profile: profileReducer,
    product: productReducer
})

export default rootReducer