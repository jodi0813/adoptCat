import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { useState } from "react";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleScrollToTakeMeHome = () => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: "takeMeHome" } });
    } else {
      const section = document.getElementById("takeMeHome");
      section?.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleScrollToTAbout = () => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: "about" } });
    } else {
      const section1 = document.getElementById("about");
      section1?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header id="navbar">
        <div className="logo">
          <Link to="/">
            <img src="./images/logo_navbar.png" alt="網站LOGO" />
          </Link>
        </div>
        <div className="menuContainer">
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="開啟選單"
        >
          <img src="./images/catFootprint.png" alt="漢堡按鈕" />
        </button>
        <div className={`menuButton${menuOpen ? " open" : ""}`}>
          <nav className="menu">
            <ul>
              <li onClick={() => { setMenuOpen(false); handleScrollToTAbout(); }}>關於我們</li>
              <li onClick={() => { setMenuOpen(false); handleScrollToTakeMeHome(); }}>領養流程</li>
              <li>
                <Link to="/waitinghome" onClick={() => setMenuOpen(false)}>帶我回家</Link>
              </li>
              <li>
                <Link to="/adoptqa" onClick={() => setMenuOpen(false)}>常見問題</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Link to="/gohome" onClick={() => setMenuOpen(false)}>
          <button type="button" className="gohomeBt">
            <img src="./images/houseBt.png" alt="回家按鈕" />
            <img src="./images/catback.svg" alt="回家按鈕hover" className="hover-img" />
          </button>
        </Link></div>
      </header>
    </>
  );
}
export default Navbar;
