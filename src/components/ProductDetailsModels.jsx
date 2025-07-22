import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedProduct, addToCart } from '../redux/ecommerceSlice'; // Import from ecommerceSlice

function ProductDetailsModal() {
  const dispatch = useDispatch();
  const selectedProduct = useSelector(state => state.ecommerce.selectedProduct);

  if (!selectedProduct) {
    return null; // Don't render if no product is selected
  }

  const handleCloseModal = () => {
    dispatch(setSelectedProduct(null)); // Clear selected product to close modal
  };

  const handleAddToCartFromModal = () => {
    dispatch(addToCart(selectedProduct));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative flex flex-col">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
          onClick={handleCloseModal}
        >
          &times;
        </button>
        <div className="flex flex-col items-center text-center">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-48 h-48 object-cover rounded-md mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
          <p className="text-blue-700 font-semibold text-xl mb-4">${selectedProduct.price}</p>
          <p className="text-gray-700 mb-4">{selectedProduct.description || "No description available."}</p>
          <p className="text-gray-500 text-sm mb-6">Category: {selectedProduct.category}</p>
          <button
            onClick={handleAddToCartFromModal}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsModal;