import React from 'react';
import Cart from '../components/Cart';
import { Link } from 'react-router-dom'; 

function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center flex-grow"> 
      <header className="bg-gradient-to-r from-teal-700 to-teal-500 text-white p-4 shadow-xl w-full">
        <h1 className="text-3xl font-heading text-center">Your Shopping Cart</h1>
      </header>
      <main className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg mt-8 mb-8">
        <Cart />
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200 text-lg" // Teal button, larger padding, rounded-lg
          >
            &larr; Continue Shopping
          </Link>
        </div>
      </main>
    </div>
  );
}

export default CartPage;