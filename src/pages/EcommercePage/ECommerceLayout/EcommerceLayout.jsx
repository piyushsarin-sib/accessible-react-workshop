import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import { CartProvider } from '../../../context/CartContext.jsx';

const ECommerceLayout = ({ children }) => {
  return (
    <CartProvider>
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </CartProvider>
  );
};

ECommerceLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ECommerceLayout;
