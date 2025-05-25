import ScrollToTop from "./utils/ScrollToTop";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <ScrollToTop/>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/adopt" element={<AdoptPage />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
