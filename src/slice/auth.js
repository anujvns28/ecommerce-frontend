import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token:localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")):null,
  authLoading:false,
  signupData:null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state,value){
        state.token = value.payload
    },
    setAuthLoading(state,value){
        state.authLoading = value.payload
    },
    setSignupData(state,value){
      state.signupData = value.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setToken ,setAuthLoading,setSignupData } = authSlice.actions

export default authSlice.reducer