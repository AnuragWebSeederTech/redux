import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, setSelectedProduct } from '../redux/ecommerceSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleViewDetails = () => {
    dispatch(setSelectedProduct(product));
  };

  return (
    <div className="group bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-white flex flex-col font-primary relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      <div 
        className="relative overflow-hidden rounded-t-2xl cursor-pointer" 
        onClick={handleViewDetails}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow relative z-10">
        <h3
          className="text-lg font-bold text-slate-800 mb-2 cursor-pointer hover:text-purple-600 transition-colors duration-300 line-clamp-2 group-hover:text-purple-600"
          onClick={handleViewDetails}
        >
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ${product.price}
          </p>
          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full uppercase tracking-wide">
            {product.category}
          </span>
        </div>
        
        <button
          onClick={handleAddToCart}
          className="mt-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;