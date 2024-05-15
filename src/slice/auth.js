import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  auth:null,
  user:null,
  authLoading:false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setsetToken(state,value){
        state.token = value.payload
    },
    setUser(state,value){
        state.user = value.payload
    },
    setAuthLoading(state,value){
        state.authLoading = value.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setUser,setsetToken ,setAuthLoading } = authSlice.actions

export default authSlice.reducer