import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filteredProduct : localStorage.getItem("allProduct") ? JSON.parse(localStorage.getItem("allProduct")) : null,
  subCategory:null,
  allProduct: localStorage.getItem("allProduct") ? JSON.parse(localStorage.getItem("allProduct")) : null,
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
    setProductLoading(state,value){
      state.productLoading = value.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setFilteredProduct,setSubCategory,setTotalProduct,setProductLoading} = productSlice.actions

export default productSlice.reducer