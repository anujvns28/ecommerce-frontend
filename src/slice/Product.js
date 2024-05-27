import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filteredProduct : null,
  subCategory:null
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
    }
  },
})

// Action creators are generated for each case reducer function
export const {setFilteredProduct,setSubCategory} = productSlice.actions

export default productSlice.reducer