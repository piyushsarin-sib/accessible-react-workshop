import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import LandingPage from "./pages/LandingPage";
import BadButton from "./components/examples/BadButton";
import BadModal from "./components/examples/BadModal";
import ExamplePage from './pages/ExamplePage';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/examples" element={<ExamplePage />} />
          <Route path="/examples/bad-button" element={<BadButton />} />
          <Route path="/examples/bad-modal" element={<BadModal />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
