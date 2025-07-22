import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { applyFilters } from '../redux/ecommerceSlice';

function Filters() {
  const dispatch = useDispatch();
  const currentFilters = useSelector(state => state.ecommerce.filters);
  const products = useSelector(state => state.ecommerce.products);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    dispatch(applyFilters({ priceRange: [0, value || 1000] }));
  };

  const handleCategoryChange = (e) => {
    dispatch(applyFilters({ category: e.target.value }));
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Filters
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto"></div>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="category" className="block text-slate-700 text-sm font-semibold mb-3 uppercase tracking-wide">
            Category
          </label>
          <div className="relative group">
            <select
              id="category"
              value={currentFilters.category}
              onChange={handleCategoryChange}
              className="block appearance-none w-full bg-white/80 backdrop-blur-sm border-2 border-slate-200 hover:border-purple-300 focus:border-purple-500 px-4 py-3 pr-10 rounded-xl shadow-sm text-slate-800 leading-tight focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all duration-300 cursor-pointer font-medium group-hover:shadow-lg"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="py-2 font-medium">{cat}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 group-hover:text-purple-600 transition-colors duration-300">
              <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="priceRange" className="block text-slate-700 text-sm font-semibold mb-4 uppercase tracking-wide">
            <div className="flex justify-between items-center">
              <span>Max Price</span>
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold text-lg">
                ${currentFilters.priceRange[1]}
              </span>
            </div>
          </label>
          <div className="relative">
            <input
              type="range"
              id="priceRange"
              min="0"
              max="1000"
              step="10"
              value={currentFilters.priceRange[1]}
              onChange={handlePriceChange}
              className="w-full h-3 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all duration-300 slider"
              style={{
                background: `linear-gradient(to right, rgb(147 51 234) 0%, rgb(147 51 234) ${(currentFilters.priceRange[1] / 1000) * 100}%, rgb(226 232 240) ${(currentFilters.priceRange[1] / 1000) * 100}%, rgb(226 232 240) 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>$0</span>
              <span>$1000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;