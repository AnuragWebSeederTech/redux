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
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Products</h2>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No products found matching your filters.</p>
      )}
    </div>
  );
}

export default ProductGrid;