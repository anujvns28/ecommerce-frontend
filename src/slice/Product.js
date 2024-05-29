import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filteredProduct : null,
  subCategory:null,
  allProduct:null,
  productLoading:false
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
    },
    productLoading(state,value){
      state.productLoading = value.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setFilteredProduct,setSubCategory,setTotalProduct,productLoading} = productSlice.actions

export default productSlice.reducer