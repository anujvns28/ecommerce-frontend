import { createSlice } from '@reduxjs/toolkit'
import { set } from 'mongoose'

const initialState = {
  user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")):null,
  userLoading:false,
  isSellerAccount:false,
  recentlyView:localStorage.getItem("recentlyView") ? 
  JSON.parse(localStorage.getItem("recentlyView")): []
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
    },
    setRecentlyView(state,value){
      const product = value.payload;
      console.log(product,"this is product form user slice")
      const index = state.recentlyView.findIndex((i)=>i._id == product._id);
      if(index > -1){
        state.recentlyView[index] = product;
      }else {
         if(state.recentlyView.length >= 5){
             state.recentlyView.pop();
             state.recentlyView.splice(0,0,product);
             localStorage.setItem("recentlyView",JSON.stringify(state.recentlyView));
         }else{
          state.recentlyView.push(product);
          localStorage.setItem("recentlyView",JSON.stringify(state.recentlyView))
         }
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const {setUser,setUserLoading,setIsSellerAccount,setRecentlyView} = profileSlice.actions

export default profileSlice.reducer