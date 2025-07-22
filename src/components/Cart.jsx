import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartQuantity } from '../redux/ecommerceSlice';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.ecommerce.cart);
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleRemoveItem = (productId) => {
    console.log("Attempting to remove item:", productId);
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    console.log("handleQuantityChange called. Product ID:", productId, "New Quantity:", newQuantity);
    if (isNaN(newQuantity) || newQuantity < 0) {
      console.warn("Invalid quantity detected. Setting to 0. Removing item.");
      dispatch(removeFromCart(productId));
      return;
    }
    dispatch(updateCartQuantity({ productId, quantity: newQuantity }));
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Shopping Cart
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto"></div>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-8xl mb-6">🛒</div>
          <h3 className="text-2xl font-semibold text-slate-800 mb-2">Your cart is empty</h3>
          <p className="text-slate-600">Add some products to get started!</p>
        </div>
      ) : (
        <>
          <div className="space-y-6 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100">
            {cartItems.map(item => (
              <div key={item.id} className="group bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white">
                <div className="flex items-center space-x-6">
                  <div className="relative overflow-hidden rounded-xl">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover transition-transform duration-300 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="flex-grow space-y-2">
                    <h3 className="font-bold text-slate-800 text-lg group-hover:text-purple-600 transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ${item.price.toFixed(2)}
                    </p>
                    
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={() => {
                          console.log("Decrement button clicked for:", item.id);
                          if (item.quantity === 1) {
                            handleRemoveItem(item.id);
                          } else {
                            handleQuantityChange(item.id, item.quantity - 1);
                          }
                        }}
                        className="bg-gradient-to-r from-slate-200 to-slate-300 hover:from-purple-200 hover:to-pink-200 text-slate-700 hover:text-purple-700 w-10 h-10 rounded-xl text-lg font-bold transition-all duration-300 hover:shadow-md active:scale-95 flex items-center justify-center"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={item.quantity}
                        onChange={(e) => {
                          console.log("Input changed for:", item.id, "Value:", e.target.value);
                          handleQuantityChange(item.id, parseInt(e.target.value));
                        }}
                        className="w-16 text-center bg-white/80 backdrop-blur-sm border-2 border-slate-200 focus:border-purple-400 rounded-xl py-2 text-lg font-semibold focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all duration-300"
                      />
                      <button 
                        onClick={() => {
                          console.log("Increment button clicked for:", item.id);
                          handleQuantityChange(item.id, item.quantity + 1);
                        }}
                        className="bg-gradient-to-r from-slate-200 to-slate-300 hover:from-purple-200 hover:to-pink-200 text-slate-700 hover:text-purple-700 w-10 h-10 rounded-xl text-lg font-bold transition-all duration-300 hover:shadow-md active:scale-95 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg active:scale-95 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-800">Total:</h3>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg">
              🚀 Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;