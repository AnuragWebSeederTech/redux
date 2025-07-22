import { configureStore } from '@reduxjs/toolkit';
import ecommerceReducer from '../redux/ecommerceSlice'; // Import your new slice reducer

// Load cart from localStorage
const preloadedState = () => {
  try {
    const savedCart = localStorage.getItem('ecommerceCart');
    if (savedCart) {
      return {
        ecommerce: { // Match the slice name
          cart: JSON.parse(savedCart)
        }
      };
    }
  } catch (e) {
    console.error("Failed to load cart from localStorage", e);
  }
  return {};
};

export const store = configureStore({
  reducer: {
    ecommerce: ecommerceReducer, // Assign your slice reducer to a key (e.g., 'ecommerce')
  },
  // You can pass preloadedState directly to configureStore
  // This helps hydrate the initial state with data from localStorage
  preloadedState: preloadedState(),
  // Redux Toolkit automatically sets up Redux DevTools Extension
  // and adds middleware like redux-thunk. No extra setup needed!
});