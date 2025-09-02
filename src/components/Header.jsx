import React, { useContext } from "react";
import { CartContext } from "../context/CartContextCore";

const Header = () => {
  const { totalItems, openCartModal } = useContext(CartContext);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav
        className="container mx-auto px-4 py-4 flex justify-between items-center"
        aria-label="Main Navigation"
      >
        <a
          href="/"
          className="text-2xl font-bold transition-colors duration-300"
          aria-label="Home: Web Accessibility Workshop"
        >
          <img
            src="/brevo_logo.svg"
            alt="Brevo Logo"
            style={{ display: "inline-block", verticalAlign: "middle", marginRight: "1rem" }}
          />
          Interaction Engineering in React: Accessibility First
        </a>
        <div className="flex items-center">
          <ul className="flex space-x-6 mr-6">
            <li>
              <a
                href="/products"
                className="transition-colors duration-300"
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="/examples"
                className="transition-colors duration-300"
              >
                Examples
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="transition-colors duration-300"
              >
                About us
              </a>
            </li>
          </ul>
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
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;