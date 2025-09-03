import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import ECommercePage, { ECommerceLayout} from './pages/ECommercePage';
import ExamplePage from './pages/ExamplePage';
import AccessibilityWorkshopPage from './components/examples/AccessibilityWorkshopPage';
import AccessibilityDemoPage from './components/examples/AccessibilityDemoPage';
import { InputAccessibilityPage} from './components/examples/InputAccessibilityPage';

function App() {
  return (
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
            path="/examples/input-accessibility"
            element={
              <Layout >
                <InputAccessibilityPage />
              </Layout>
            }
          />
          <Route
            path="/examples/e-commerce"
            element={
              <ECommerceLayout>
                <ECommercePage />
              </ECommerceLayout>
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
  );
}

export default App;
