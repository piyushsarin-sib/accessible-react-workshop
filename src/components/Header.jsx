import React from "react";

const Header = () => (
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
        Build an Accessible and Inclusive React app
      </a>
      <ul className="flex space-x-6">
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
    </nav>
  </header>
);

export default Header;