import React from "react";

const Header = () => {
  return (
    <>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:py-2 focus:px-4 focus:bg-white focus:text-blue-600 focus:border-blue-600 focus:border focus:rounded"
      >
        Skip to main content
      </a>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav
          className="container mx-auto px-10 py-4 flex justify-between items-center"
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
            Home
          </a>
          <div className="flex items-center">
            <ul className="flex space-x-6 mr-6">
              <li>
                <a
                  href="/demo"
                  className="transition-colors duration-300"
                >
                  Demo
                </a>
              </li>
              <li>
                <a
                  href="/exercises"
                  className="transition-colors duration-300"
                >
                  Examples
                </a>
              </li>
              <li>
                <a
                  href="/best-practices"
                  className="transition-colors duration-300"
                >
                  Best Practices
                </a>
              </li>
              <li>
                <a
                  href="/references"
                  className="transition-colors duration-300"
                >
                  Reference
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
