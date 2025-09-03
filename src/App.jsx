import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import ProductLayout from './components/ProductLayout';
import LandingPage from "./pages/LandingPage";
import ProductListingPage from './pages/ProductListingPage';
import BadSwitch from "./components/examples/BadSwitch";
import BadModal from "./components/examples/BadModal";
import ExamplePage from './pages/ExamplePage';
import AccessibilityWorkshopPage from './components/examples/AccessibilityWorkshopPage';
import AccessibilityDemoPage from './components/examples/AccessibilityDemoPage';
import InputAccessibilityPage from './components/examples/InputAccessibilityPage';
import { CartProvider } from './context/CartContext.jsx';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Routes WITH Layout (Header + Footer) */}
          <Route
            path="/"
            element={
              <Layout showHeader={true} showFooter={true} withLayout={true}>
                <LandingPage />
              </Layout>
            }
          />
          <Route
            path="/examples"
            element={
              <Layout showHeader={true} showFooter={true} withLayout={true}>
                <ExamplePage />
              </Layout>
            }
          />
          <Route
            path="/examples/e-commerce"
            element={
              <ProductLayout>
                <ProductListingPage />
              </ProductLayout>
            }
          />
          <Route
            path="/examples/modal"
            element={
              <Layout showHeader={true} showFooter={true} withLayout={true}>
                <BadModal />
              </Layout>
            }
          />
          {/* Routes WITHOUT Header (Full-screen pages) */}
          <Route
            path="/examples/workshop"
            element={
              <Layout>
                <AccessibilityWorkshopPage />
              </Layout>
            }
          />
          <Route
            path="/examples/demo"
            element={
              <Layout showHeader={true}>
                <AccessibilityDemoPage />
              </Layout>
            }
          />
          <Route
            path="/agenda"
            element={
              <Layout showHeader={true}>
                <AccessibilityDemoPage />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
