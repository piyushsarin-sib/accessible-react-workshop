import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import ECommercePage from "./pages/ECommercePage";
import ExamplePage from "./pages/ExamplePage";
import ECommerceLayout from "./pages/ECommercePage/ECommerceLayout/ECommerceLayout";
import { InputAccessibilityPage } from "./components/examples/InputAccessibilityPage";

import { default as SolvedLayout } from "./solved/components/Layout";
import { default as SolvedLandingPage } from "./solved/pages/LandingPage";
import { default as SolvedECommercePage } from "./solved/pages/EcommercePage/ECommercePage";
import { default as SolvedExamplePage } from "./solved/pages/ExamplePage";
import { default as SolvedECommerceLayout } from "./solved/pages/EcommercePage/ECommerceLayout";
import { InputAccessibilityPage as SolvedInputAccessibilityPage } from "./solved/components/examples/InputAccessibilityPage";

import ListExample from "./demos/Collections/VerticalLists/ListExample";
import HorizontalListExample from "./demos/Collections/HorizontalLists/HorizontalListExample";
import SingleSelectionExample from "./demos/Collections/Selection/SingleSelectionExample";
import MultiSelectionExample from "./demos/Collections/Selection/MultiSelectionExample";
import UncontrolledMenuExample from "./demos/Collections/Selection/EmptyMenuExample";
import AccordionExample from "./demos/Collections/Expansion/AccordionExample";
import CollapsibleTreeExample from "./demos/Collections/VerticalLists/CollapsibleTreeExample";

// Solved demo imports
import { default as SolvedListExample } from "./solved/demos/Collections/VerticalLists/ListExample";
import { default as SolvedHorizontalListExample } from "./solved/demos/Collections/HorizontalLists/HorizontalListExample";
import { default as SolvedSingleSelectionExample } from "./solved/demos/Collections/Selection/SingleSelectionExample";
import { default as SolvedMultiSelectionExample } from "./solved/demos/Collections/Selection/MultiSelectionExample";
import { default as SolvedUncontrolledMenuExample } from "./solved/demos/Collections/Selection/EmptyMenuExample";
import { default as SolvedAccordionExample } from "./solved/demos/Collections/Expansion/AccordionExample";
import { default as SolvedCollapsibleTreeExample } from "./solved/demos/Collections/VerticalLists/CollapsibleTreeExample";

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

        {/* unsolved examples */}

        {/* solved examples */}
        <Route
          path="/solved"
          element={
            <SolvedLayout showHeader={true} showFooter={true} withLayout={true}>
              <SolvedLandingPage />
            </SolvedLayout>
          }
        />

        <Route
          path="/solved/examples"
          element={
            <SolvedLayout showHeader={true} showFooter={true} withLayout={true}>
              <SolvedExamplePage />
            </SolvedLayout>
          }
        />
        <Route
          path="/solved/examples/input-accessibility"
          element={
            <SolvedLayout>
              <SolvedInputAccessibilityPage />
            </SolvedLayout>
          }
        />
        <Route
          path="/solved/examples/e-commerce"
          element={
            <SolvedECommerceLayout>
              <SolvedECommercePage />
            </SolvedECommerceLayout>
          }
        />

        {/* QUICK DEMOS */}

        <Route path="/demos/collections/vertical-lists" element={<ListExample />} />

        <Route path="/demos/collections/horizontal-lists" element={<HorizontalListExample />} />

        <Route path="/demos/collections/horizontal-lists" element={<HorizontalListExample />} />
        <Route path="/demos/collections/single-select" element={<SingleSelectionExample />} />
        <Route path="/demos/collections/multi-select" element={<MultiSelectionExample />} />
        <Route path="/demos/collections/menu-skeleton" element={<UncontrolledMenuExample />} />

        {/* Expansion Examples */}
        <Route path="/demos/collections/accordion" element={<AccordionExample />} />
        <Route path="/demos/collections/expansion" element={<CollapsibleTreeExample />} />

        {/* SOLVED QUICK DEMOS - Complete accessibility implementations */}
        <Route path="/solved/demos/collections/vertical-lists" element={<SolvedListExample />} />
        <Route path="/solved/demos/collections/horizontal-lists" element={<SolvedHorizontalListExample />} />
        <Route path="/solved/demos/collections/single-select" element={<SolvedSingleSelectionExample />} />
        <Route path="/solved/demos/collections/multi-select" element={<SolvedMultiSelectionExample />} />
        <Route path="/solved/demos/collections/menu-skeleton" element={<SolvedUncontrolledMenuExample />} />
        <Route path="/solved/demos/collections/accordion" element={<SolvedAccordionExample />} />
        <Route path="/solved/demos/collections/expansion" element={<SolvedCollapsibleTreeExample />} />
      </Routes>
    </Router>
  );
}

export default App;
