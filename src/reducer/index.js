import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "../slice/auth"
import profileReducer from "../slice/user"

const rootReducer = combineReducers({
    auth : authReducer,
    profile: profileReducer
})

export default rootReducer