import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <>
    <Header />
    <main
      className="min-h-[calc(100vh-300px)] flex flex-col items-center justify-center px-6 py-12 text-center"
      aria-labelledby="main-heading"
    >
      {children}
    </main>
    {/* Footer */}
    <Footer/>
  </>
);
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;