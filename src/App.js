import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ModeSelection from "./pages/ModeSelection";
import Builder from "./pages/Builder";
import TemplatesPage from "./pages/TemplatesPage";
import Features from "./pages/Features";
import Help from "./pages/Help";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mode" element={<ModeSelection />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/features" element={<Features />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Router>
  );
}

export default App;
