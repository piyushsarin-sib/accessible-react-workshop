import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CartContext } from '../../../context/CartContextCore.js';
import { CartProvider } from '../../../context/CartContext.jsx';

const ECommerceHeader = () => {
  const { totalItems, openCartModal } = React.useContext(CartContext);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center" aria-label="Main Navigation">
        <Link to="/" className="text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md">
          Accessible eCommerce
        </Link>
        <button
          onClick={openCartModal}
          className="relative p-2 bg-blue-600 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`Open cart with ${totalItems} items`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              ({totalItems})
            </span>
          )}
        </button>
      </nav>
    </header>
  );
};

const ECommerceFooter = () => (
  <footer className="bg-gray-800 text-white mt-12">
    <div className="container mx-auto px-4 py-6">
      <nav aria-label="Footer Navigation">
        <ul className="flex justify-center space-x-6">
          <li><Link to="/help" className="hover:underline">Help</Link></li>
          <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
          <li><Link to="/shipping" className="hover:underline">Shipping & Returns</Link></li>
        </ul>
      </nav>
      <p className="text-center mt-4 text-sm">&copy; 2025 Brevo. All rights reserved.</p>
    </div>
  </footer>
);

const ECommerceLayout = ({ children }) => {
  return (
    <CartProvider>
      <div className="bg-gray-50">
        <ECommerceHeader />
        <main>{children}</main>
        <ECommerceFooter />
        {/* We'll handle CartModal in the specific route */}
      </div>
    </CartProvider>
  );
};

ECommerceLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ECommerceLayout;
