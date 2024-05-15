import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "../slice/auth"

const rootReducer = combineReducers({
    auth : authReducer
})

export default rootReducer