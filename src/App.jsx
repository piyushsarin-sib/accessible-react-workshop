import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import ECommercePage from './pages/ECommercePage';
import ExamplePage from './pages/ExamplePage';
import ECommerceLayout from './pages/ECommercePage/ECommerceLayout/ECommerceLayout';
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
        </Routes>
      </Router>
  );
}

export default App;
