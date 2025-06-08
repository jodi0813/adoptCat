import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scss";
function Navbar() {
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
        <div>
          <Link to="/" className="logo">
            <img src="./images/logo_navbar.png" alt="網站LOGO" />
          </Link>
        </div>
        <div className="menuButton">
          <nav className="menu">
            <ul>
              <li onClick={handleScrollToTAbout}>關於我們</li>
              <li onClick={handleScrollToTakeMeHome}>領養流程</li>
              <li>
                <Link to="/waitinghome">帶我回家</Link>
              </li>
              <li>
                <Link to="/adoptqa">常見問題</Link>
              </li>
            </ul>
          </nav>
          <Link to="/gohome">
            <button type="button" className="gohomeBt">
              <img src="./images/houseBt.png" alt="回家按鈕" />
              回家
            </button>
          </Link>
        </div>
      </header>
    </>
  );
}
export default Navbar;
