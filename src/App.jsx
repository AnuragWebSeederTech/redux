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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col font-primary"> 
        <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-sm border-b border-purple-500/20">
          <nav className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-all duration-500 ease-out transform hover:scale-105">
                E-Commerce
              </Link>
              <div className="relative group">
                <Link to="/cart" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-full flex items-center space-x-3 transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-xl shadow-lg"> 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="flex items-center space-x-1">
                    <span>Cart</span>
                    <span className="bg-white/20 rounded-full px-2 py-0.5 text-sm font-bold">{cartItems.length}</span>
                  </span>
                </Link>
              </div>
            </div>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={
            <main className="grid grid-cols-1 lg:grid-cols-5 gap-8 p-6 max-w-7xl mx-auto w-full flex-grow">
              <aside className="lg:col-span-1 bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/50 lg:h-fit lg:sticky lg:top-28 hover:shadow-2xl transition-all duration-300">
                <Filters />
              </aside>
              <section className="lg:col-span-4 lg:w-317 bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
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