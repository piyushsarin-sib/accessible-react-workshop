import React from 'react';
import Link from '../../common/Link';
import CartButton from '../../features/Cart/CartButton';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center" aria-label="Main Navigation">
        <Link to="/" className="text-2xl font-bold rounded-md">
          Accessible eCommerce
        </Link>
        <CartButton />
      </nav>
    </header>
  );
};

export default Header;
