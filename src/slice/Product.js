import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filteredProduct : null,
  subCategory:null,
  allProduct:null
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setFilteredProduct(state,value){
        state.filteredProduct = value.payload
    },
    setSubCategory(state,value){
        state.subCategory = value.payload
    },
    setTotalProduct(state,value){
      state.allProduct = value.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setFilteredProduct,setSubCategory,setTotalProduct} = productSlice.actions

export default productSlice.reducer