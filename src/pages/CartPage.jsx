import React from 'react';
import Cart from '../components/Cart';
import { Link } from 'react-router-dom';

function CartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      <div className="flex-grow flex flex-col items-center p-6">
        <main className="w-full max-w-5xl bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50 mt-8 mb-8 hover:shadow-2xl transition-all duration-300">
          <Cart />
          
          <div className="mt-12 text-center">
            <Link
              to="/"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              <span>Continue Shopping</span>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CartPage;