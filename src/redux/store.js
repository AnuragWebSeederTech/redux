import { configureStore } from '@reduxjs/toolkit';
import ecommerceReducer from '../redux/ecommerceSlice'; 

export const store = configureStore({
  reducer: {
    ecommerce: ecommerceReducer, 
  },
});