// src/components/Filters.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { applyFilters } from '../redux/ecommerceSlice'; // Import from ecommerceSlice

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
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Filters</h2>

      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category:</label>
        <select
          id="category"
          value={currentFilters.category}
          onChange={handleCategoryChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="priceRange" className="block text-gray-700 text-sm font-bold mb-2">Max Price:</label>
        <input
          type="range"
          id="priceRange"
          min="0"
          max="1000" // Adjust max based on your product prices
          step="10"
          value={currentFilters.priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-3 bg-gray-200 rounded-lg cursor-pointer range-sm accent-blue-500"
        />
        <span className="text-gray-700 text-sm mt-1 block">${currentFilters.priceRange[1]}</span>
      </div>
    </div>
  );
}

export default Filters;