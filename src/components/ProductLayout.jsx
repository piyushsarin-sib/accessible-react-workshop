import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContextCore';
import CartModal from './CartModal';

const ProductHeader = () => {
  const { totalItems, openCartModal } = React.useContext(CartContext);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center" aria-label="Main Navigation">
        <Link to="/products" className="text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md">
          Accessible eCommerce
        </Link>
        <button 
          onClick={openCartModal}
          className="text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
          aria-label={`Open cart with ${totalItems} items`}
        >
          Cart ({totalItems})
        </button>
      </nav>
    </header>
  );
};

const ProductFooter = () => (
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

const ProductLayout = ({ children }) => {
  return (
    <div className="bg-gray-50">
      <ProductHeader />
      <main>{children}</main>
      <ProductFooter />
      <CartModal />
    </div>
  );
};

ProductLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

ProductLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductLayout;
