import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")):null,
  userLoading:false,
  isSellerAccount:false,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser(state,value){
        state.user = value.payload
    },
    setUserLoading(state,value){
        state.userLoading = value.payload
    },
    setIsSellerAccount(state,value){
      state.isSellerAccount = value.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const {setUser,setUserLoading,setIsSellerAccount} = profileSlice.actions

export default profileSlice.reducer