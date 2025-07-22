import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartQuantity } from '../redux/ecommerceSlice';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.ecommerce.cart);

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId, event) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 0) { // Ensure it's a valid non-negative number
        dispatch(updateCartQuantity(productId, newQuantity));
    }
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
                    <label htmlFor={`qty-${item.id}`} className="text-gray-700 text-sm mr-2">Qty:</label>
                    <input
                      type="number"
                      id={`qty-${item.id}`}
                      min="0"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e)}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                    />
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
