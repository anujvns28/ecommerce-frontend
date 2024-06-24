import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const initialState = {
  filteredProduct: localStorage.getItem("allProduct") ? JSON.parse(localStorage.getItem("allProduct")) : null,
  subCategory: null,
  allProduct: localStorage.getItem("allProduct") ? JSON.parse(localStorage.getItem("allProduct")) : null,
  productLoading: false,
  productCreatingStep: 1,
  productInformation: null,
  isEdit: false,
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  cartTotalPrice:localStorage.getItem("totalCartPrice") 
    ? JSON.parse(localStorage.getItem("totalCartPrice"))
    : 0,
  wishlist: localStorage.getItem("wishlist")
    ? JSON.parse(localStorage.getItem("wishlist"))
    : [],
  recentlyView: localStorage.getItem("recentlyView")
    ? JSON.parse(localStorage.getItem("recentlyView"))
    : [],
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setFilteredProduct(state, value) {
      state.filteredProduct = value.payload
    },
    setSubCategory(state, value) {
      state.subCategory = value.payload
    },
    setTotalProduct(state, value) {
      state.allProduct = value.payload
    },
    setProductLoading(state, value) {
      state.productLoading = value.payload
    },
    setProductCreatingSteps(state, value) {
      state.productCreatingStep = value.payload
    },
    setProductInformation(state, value) {
      state.productInformation = value.payload;
    },
    setIsEdit(state, value) {
      state.isEdit = value.payload;
    },
    // cart
    addToCart(state, value) {
      const product = value.payload;
      const index = state.cart.findIndex((item) => item._id == product._id);
      if (index === -1) {
        state.cart.push(value.payload)
        toast.success('Shouse Added')
        localStorage.setItem("cart", JSON.stringify(state.cart))
      } else {
        toast.error("Shouse Alredy in cart")
      }
    },
    updateCartProduct(state,value){
      const product = value.payload;
      const index = state.cart.findIndex((item) => item._id == product._id);
      state.cart[index] = value.payload
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },
    removeCart(state, value) {
      const index = state.cart.findIndex((item) => item._id === value.payload._id)
      state.cart.splice(index, 1)
      localStorage.setItem("cart", JSON.stringify(state.cart))
    },
    addCartPrice(state,value){
      state.cartTotalPrice = state.cartTotalPrice + value.payload;
      localStorage.setItem("totalCartPrice",state.cartTotalPrice)
    },
    subCartPrice(state,value){
      state.cartTotalPrice = state.cartTotalPrice - value.payload
    },
    // wishlisht
    addToWishlist(state, value) {
      const product = value.payload;
      const index = state.wishlist.findIndex((item) => item._id === product._id);
      if (index === -1) {
        state.wishlist.push(product);
        toast.success("Shouse Added To Wishlist");
        localStorage.setItem("wishlist", JSON.stringify(state.wishlist))
      } else {
        toast.error("Shouse Alredy in Wishlist");
      }
    },
    removeToWishlist(state, value) {
      const product = value.payload;
      const index = state.wishlist.findIndex((item) => item._id === product._id);
      state.wishlist.splice(index, 1);
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist))
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setFilteredProduct,
  setSubCategory,
  setTotalProduct,
  setProductLoading,
  setProductCreatingSteps,
  setProductInformation,
  setIsEdit,
  addToCart,
  removeCart,
  addCartPrice,
  updateCartProduct,
  subCartPrice,
  addToWishlist,
  removeToWishlist,

} = productSlice.actions

export default productSlice.reducer