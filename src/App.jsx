import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import ECommercePage from "./pages/ECommercePage";
import ExamplePage from "./pages/ExamplePage";
import ECommerceLayout from "./pages/ECommercePage/ECommerceLayout/ECommerceLayout";
import { InputAccessibilityPage } from "./components/examples/InputAccessibilityPage";
import ListExample from "./demos/Collections/VerticalLists/ListExample";
import HorizontalListExample from "./demos/Collections/HorizontalLists/HorizontalListExample";

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
            <Layout>
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

        <Route path="/demos/collections/vertical-lists" element={<ListExample />} />

        <Route path="/demos/collections/horizontal-lists" element={<HorizontalListExample />} />
      </Routes>
    </Router>
  );
}

export default App;
