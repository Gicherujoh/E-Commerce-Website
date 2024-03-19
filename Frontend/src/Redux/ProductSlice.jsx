import { createSlice } from '@reduxjs/toolkit';
import {useState,useContext} from 'react'
import { productItems} from '../Product'
import {produce} from 'immer'

// Create your product slice
const initialState = {
    amount: 0,
    User:[],
    product:[]
}
const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addTocart(state, action) {
            const existingItemIndex = state.product.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex !== -1) {
                // If the item already exists, create a new array with the updated item at the same index
               state.product[existingItemIndex]= action.payload
            } else {
                // If the item does not exist, simply return the existing state
                state.product.push(action.payload)
            }
        } ,
        ClearCart(state, action) {
            state.product = [];
        },
        RemoveProduct(state,action){
            state.product = state.product.filter(item => item.id !== action.payload);
            
        },
        calculateTotal(state) {
            let total =0
            state.product.forEach((item) => {
                total+=item.price
            })
            state.amount = total;
        }
    }
})
export const {addTocart,ClearCart,RemoveProduct,calculateTotal} = productSlice.actions
export default productSlice.reducer;