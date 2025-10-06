import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import ECommercePage from "./pages/ECommercePage";
import ExercisesPage from "./pages/ExercisesPage";
import ECommerceLayout from "./pages/ECommercePage/ECommerceLayout/ECommerceLayout";
import CardWrapper from "./playground/Card";
import ProductsGrid from "./playground/ProductGrid";
import FilterMenu from "./playground/FilterMenu";
import NestedCollectionWithTitles from "./playground/NestedCollectionWithTitles";
import EdgeCases from "./playground/EdgeCases";

import ListExample from "./demos/VerticalLists/ListExample";
import HorizontalListExample from "./demos/HorizontalLists/HorizontalListExample";
import SingleSelectionExample from "./demos/Selection/SingleSelectionExample";
import MultiSelectionExample from "./demos/Selection/MultiSelectionExample";
import UncontrolledMenuExample from "./demos/Selection/EmptyMenuExample";
import CollapsibleTreeExample from "./demos/Expansion/CollapsibleTreeExample";

// Keyboard Navigation demos
import RovingIndexExample from "./demos/KeyboardNavigation/RovingIndexExample";

// Overlay demos
import MenuWithOverlay from "./demos/Overlay/MenuWithOverlay";
import ModalExample from "./demos/Overlay/ModalExample";
import SimpleTooltip from "./demos/Overlay/SimpleTooltip";

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
          path="/exercises"
          element={
            <Layout showHeader={true} showFooter={true} withLayout={true}>
              <ExercisesPage />
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

        <Route
          path="/playground/Card"
          element={
            <Layout>
              <CardWrapper />
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
          path="/playground/filter-menu"
          element={
            <Layout>
              <FilterMenu />
            </Layout>
          }
        />
        <Route
          path="/playground/nested-collection-with-titles"
          element={
            <Layout>
              <NestedCollectionWithTitles />
            </Layout>
          }
        />

        <Route
          path="/playground/edge-cases"
          element={
            <Layout>
              <EdgeCases />
            </Layout>
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

        {/* OVERLAY DEMOS */}
        <Route path="/demos/overlay/menu" element={<MenuWithOverlay />} />
        <Route path="/demos/overlay/modal" element={<ModalExample />} />
        <Route path="/demos/overlay/tooltip" element={<SimpleTooltip />} />
      </Routes>
    </Router>
  );
}

export default App;
