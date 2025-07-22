import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from './redux/ecommerceSlice';
import productsData from './data/products.json';

import Filters from './components/Filters';
import ProductGrid from './components/ProductGrid';
import ProductDetailsModal from './components/ProductDetailsModels';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CartPage from './pages/CartPage';

function App() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.ecommerce.cart);

  useEffect(() => {
    dispatch(setProducts(productsData));
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col font-primary"> 
        <header className="bg-gradient-to-r from-teal-700 to-teal-500 text-white p-4 shadow-xl sticky top-0 z-10"> {/* Teal gradient header */}
          <nav className="max-w-screen-xl mx-auto flex justify-between items-center">
            <Link to="/" className="text-4xl font-heading text-white hover:text-teal-100 transition-all duration-300 ease-in-out">
              E-Commerce
            </Link>
            <div className="relative">
              <Link to="/cart" className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-full flex items-center space-x-2 transition-all duration-300 ease-in-out"> 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Cart (<span className="font-semibold">{cartItems.length}</span>)</span>
              </Link>
            </div>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={
            <main className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6 max-w-screen-xl mx-auto w-full flex-grow">
              <aside className="md:col-span-1 bg-white p-6 rounded-xl shadow-lg md:h-fit md:sticky md:top-24">
                <Filters />
              </aside>
              <section className="md:col-span-4 bg-white p-6 rounded-xl shadow-lg">
                <ProductGrid />
              </section>
            </main>
          } />
          <Route path="/cart" element={<CartPage />} />
        </Routes>

        <ProductDetailsModal />
      </div>
    </Router>
  );
}

export default App;