import ScrollToTop from "./utils/ScrollToTop";
import "./App.css";
import "../src/index.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import WaitingHome from "./pages/WaitingHome/WaitingHome";
import AdoptQA from "./pages/AdoptQA/AdoptQA";
import CatProfile from "./pages/CatProfile/CatProfile";
import GoHome from "./pages/GoHome/GoHome";
import Follow from "./pages/GoHome/Follow";
import Adopt from "./pages/GoHome/Adopt";
import CatQuiz from "./pages/GoHome/CatQuiz";
import Find from "./pages/Find/Find";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/waitinghome" element={<WaitingHome />} />
        <Route path="/waitinghome/catprofile" element={<CatProfile />} />
        <Route path="/adoptqa" element={<AdoptQA />} />
        <Route path="/gohome" element={<GoHome />} />
        <Route path="/gohome/follow" element={<Follow />} />
        <Route path="/gohome/adopt" element={<Adopt />} />
        <Route path="/gohome/adopt/catquiz" element={<CatQuiz />} />
        <Route path="/find" element={<Find />}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
