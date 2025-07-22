import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, setSelectedProduct } from '../redux/ecommerceSlice'; // Import from ecommerceSlice

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleViewDetails = () => {
    dispatch(setSelectedProduct(product));
  };

  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-col font-primary"> {/* Added font-primary */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover cursor-pointer"
        onClick={handleViewDetails}
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3
          className="text-lg font-semibold text-gray-900 mb-1 cursor-pointer hover:text-teal-600 transition-colors duration-200" // Teal hover color
          onClick={handleViewDetails}
        >
          {product.name}
        </h3>
        <p className="text-amber-600 font-bold mb-2 text-xl">${product.price}</p>
        <p className="text-gray-500 text-sm mb-4 flex-grow">{product.category}</p>
        <button
          onClick={handleAddToCart}
          className="mt-auto bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;