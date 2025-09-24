import React from 'react';
import Link from '../../common/Link';

const Footer = () => (
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

export default Footer;
