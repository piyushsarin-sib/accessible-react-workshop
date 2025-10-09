import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import ECommercePage from "./pages/ECommercePage";
import ExercisesPage from "./pages/ExercisesPage";
import ECommerceLayout from "./pages/ECommercePage/ECommerceLayout/EcommerceLayout";
import DemoPage from "./pages/DemoPage";
// Playground imports
import {
  CardWrapper,
  ProductsGrid,
  FilterMenu,
  EdgeCases,
  ECommIssues,
  Overlay,
} from "./playground";

// Demo imports
import {
  ListExample,
  HorizontalListExample,
  SingleSelectionExample,
  MultiSelectionExample,
  UncontrolledMenuExample,
  CollapsibleTreeExample,
  RovingIndexExample,
  MenuWithOverlay,
  ModalExample,
  SimpleTooltip,
} from "./demos";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Layout Routes */}
        <Route
          path="/"
          element={
            <Layout showHeader showFooter withLayout>
              <LandingPage />
            </Layout>
          }
        />
        <Route
          path="/exercises"
          element={
            <Layout showHeader showFooter withLayout>
              <ExercisesPage />
            </Layout>
          }
        />

        <Route
          path="/demo"
          element={
            <Layout showHeader showFooter withLayout>
              <DemoPage />
            </Layout>
          }
        />
       {/* E-Commerce Example */}
        <Route
          path="/e-commerce"
          element={
            <ECommerceLayout>
              <ECommercePage />
            </ECommerceLayout>
          }
        />

        {/* Playground Routes */}
        <Route path="/playground/e-commerce-issues" element={<Layout><ECommIssues /></Layout>} />
        <Route path="/playground/CardWrapper" element={<Layout><CardWrapper /></Layout>} />
        <Route path="/playground/product-grid" element={<Layout><ProductsGrid /></Layout>} />
        <Route path="/playground/filter-menu" element={<Layout><FilterMenu /></Layout>} />
        <Route path="/playground/overlay" element={<Layout><Overlay /></Layout>} />
        <Route path="/playground/edge-cases" element={<Layout><EdgeCases /></Layout>} />

        {/* Demo Routes */}
        <Route path="/demos/vertical-lists" element={<ListExample />} />
        <Route path="/demos/horizontal-lists" element={<HorizontalListExample />} />
        <Route path="/demos/single-select" element={<SingleSelectionExample />} />
        <Route path="/demos/multi-select" element={<MultiSelectionExample />} />
        <Route path="/demos/menu-skeleton" element={<UncontrolledMenuExample />} />
        <Route path="/demos/expansion" element={<CollapsibleTreeExample />} />
        <Route path="/demos/key-nav/roving-index" element={<RovingIndexExample />} />
        <Route path="/demos/overlay/menu" element={<MenuWithOverlay />} />
        <Route path="/demos/overlay/modal" element={<ModalExample />} />
        <Route path="/demos/overlay/tooltip" element={<SimpleTooltip />} />
      </Routes>
    </Router>
  );
}

export default App;
