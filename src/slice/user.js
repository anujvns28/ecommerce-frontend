import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")):null,
  userLoading:false,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser(state,value){
        state.user = value.payload
    },
    userLoading(state,value){
        state.authLoading = value.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {setUser,userLoading} = profileSlice.actions

export default profileSlice.reducer