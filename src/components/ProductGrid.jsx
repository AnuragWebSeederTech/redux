import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';

function ProductGrid() {
  const products = useSelector(state => state.ecommerce.products);
  const filters = useSelector(state => state.ecommerce.filters);

  const filteredProducts = products.filter(product => {
    const matchesCategory = filters.category === 'All' || product.category === filters.category;
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    return matchesCategory && matchesPrice;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          Products
        </h2>
        <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {filteredProducts.length} items
        </div>
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-slate-600 mb-2">No products found</p>
          <p className="text-slate-500">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}

export default ProductGrid;