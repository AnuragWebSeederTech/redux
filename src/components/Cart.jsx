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
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center space-x-4 border-b pb-4 last:border-b-0 last:pb-0">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-1">
                    <button
                      onClick={() => {
                        console.log("Decrement button clicked for:", item.id); 
                        if (item.quantity === 1) {
                          handleRemoveItem(item.id);
                        } else {
                          handleQuantityChange(item.id, item.quantity - 1);
                        }
                      }}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l text-sm hover:bg-gray-300 transition duration-150"
                      
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="0" 
                      value={item.quantity}
                      onChange={(e) => {
                          console.log("Input changed for:", item.id, "Value:", e.target.value);
                          handleQuantityChange(item.id, parseInt(e.target.value));
                      }}
                      className="w-12 text-center border-t border-b border-gray-300 py-1 text-sm focus:outline-none"
                    />
                    <button
                      onClick={() => {
                          console.log("Increment button clicked for:", item.id);
                          handleQuantityChange(item.id, item.quantity + 1);
                      }}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r text-sm hover:bg-gray-300 transition duration-150"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-bold text-gray-900 flex justify-between">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </h3>
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;