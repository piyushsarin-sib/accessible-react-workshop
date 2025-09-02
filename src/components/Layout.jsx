import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, withLayout, showHeader, showFooter }) => {

    return (
      <>
        {showHeader && <Header />}
        <main
          className={`${withLayout ? "min-h-[calc(100vh-300px)] flex flex-col items-center justify-center px-6 py-12 text-center" : ""}`}
          aria-labelledby="main-heading"
        >
          {children}
        </main>
       {showFooter && <Footer />}
      </>
    );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  withLayout: PropTypes.bool,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
};

export default Layout;