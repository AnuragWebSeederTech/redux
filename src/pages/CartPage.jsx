// src/pages/CartPage.js
import React from 'react';
import Cart from '../components/Cart'; // Import the Cart component
import { Link } from 'react-router-dom'; // To navigate back to home

function CartPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <header className="bg-blue-600 text-white p-4 shadow-md w-full">
        <h1 className="text-3xl font-bold text-center">Your Shopping Cart</h1>
      </header>
      <main className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mt-8">
        <Cart />
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-block bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            &larr; Continue Shopping
          </Link>
        </div>
      </main>
    </div>
  );
}

export default CartPage;