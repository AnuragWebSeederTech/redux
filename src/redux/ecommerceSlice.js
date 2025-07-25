import { createSlice } from '@reduxjs/toolkit';

const ecommerceSlice = createSlice({
  name: 'ecommerce', // A name for your slice. Used as a prefix for action types.
  initialState: {
    products: [],
    cart: [],
    filters: {
      priceRange: [0, 1000], // Example default range
      category: 'All',
    },
    selectedProduct: null, // For the bonus modal
  },
  reducers: {
    // Action: setProducts
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    // Action: applyFilters
    applyFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    // Action: addToCart
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cart.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    // Action: removeFromCart
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    // Action: updateCartQuantity
    updateCartQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemToUpdate = state.cart.find(item => item.id === productId);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        if (itemToUpdate.quantity <= 0) {
          state.cart = state.cart.filter(item => item.id !== productId); // Remove if quantity is 0 or less
        }
      }
    },
    // Action: setSelectedProduct
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const {
  setProducts,
  applyFilters,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  setSelectedProduct,
} = ecommerceSlice.actions;

export default ecommerceSlice.reducer;