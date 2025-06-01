import ScrollToTop from "./utils/ScrollToTop";
import "./App.css";
import '../src/index.css';

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import WaitingHome from "./pages/WaitingHome/WaitingHome";
import AdoptQA from "./pages/AdoptQA/AdoptQA";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/waitinghome" element={<WaitingHome />} />
          <Route path="/adoptqa" element={<AdoptQA/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
