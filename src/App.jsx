import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import ECommercePage from "./pages/ECommercePage";
import ExamplePage from "./pages/ExamplePage";
import ECommerceLayout from "./pages/ECommercePage/ECommerceLayout/ECommerceLayout";
import { InputAccessibilityPage } from "./components/examples/InputAccessibilityPage";
import Card from "./playground/Card";
import ProductsGrid from "./playground/ProductsGrid";
import FilterMenu from "./playground/FilterMenu";
import NestedCollectionWithTitles from "./playground/NestedCollectionWithTitles";

import ListExample from "./demos/VerticalLists/ListExample";
import HorizontalListExample from "./demos/HorizontalLists/HorizontalListExample";
import SingleSelectionExample from "./demos/Selection/SingleSelectionExample";
import MultiSelectionExample from "./demos/Selection/MultiSelectionExample";
import UncontrolledMenuExample from "./demos/Selection/EmptyMenuExample";
import CollapsibleTreeExample from "./demos/Expansion/CollapsibleTreeExample";

// Keyboard Navigation demos
import RovingIndexExample from "./demos/KeyboardNavigation/RovingIndexExample";

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
          path="/playground/:folderName"
          element={
            <Layout>
              <Card />
            </Layout>
          }
        />
        <Route
          path="/playground/product-grid"
          element={
            <Layout>
              <ProductsGrid />
            </Layout>
          }
        />
        <Route
          path="/playground/menu"
          element={
            <Layout>
              <FilterMenu />
            </Layout>
          }
        />
        <Route
          path="/playground/nested-collection"
          element={
            <Layout>
              <NestedCollectionWithTitles />
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

        {/* QUICK DEMOS */}

        <Route path="/demos/vertical-lists" element={<ListExample />} />

        <Route path="/demos/horizontal-lists" element={<HorizontalListExample />} />

        <Route path="/demos/single-select" element={<SingleSelectionExample />} />
        <Route path="/demos/multi-select" element={<MultiSelectionExample />} />
        <Route path="/demos/menu-skeleton" element={<UncontrolledMenuExample />} />

        {/* Expansion Examples */}
        <Route path="/demos/expansion" element={<CollapsibleTreeExample />} />

        {/* KEYBOARD NAVIGATION DEMOS */}
        <Route path="/demos/key-nav/roving-index" element={<RovingIndexExample />} />
      </Routes>
    </Router>
  );
}

export default App;
