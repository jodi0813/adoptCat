import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss"
function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <header id="navbar">
        <div>
          <Link to="/" className="logo">
            <img src="/images/logo_navbar.png" alt="網站LOGO" />
          </Link>
        </div>
        <div className="menuButton">
        <nav className="menu">
          <ul>
            <li>
              <Link to="/">關於我們</Link>
            </li>
            <li>
              <Link to="/">領養流程</Link>
            </li>
            <li>
              <Link to="/">帶我回家</Link>
            </li>
            <li>
              <Link to="/">常見問題</Link>
            </li>
          </ul>
        </nav>
        <button type="button" className="" onClick={() => navigate("/")}>
          <img src="/images/houseBt.png" alt="回家按鈕" />
          回家
        </button></div>
      </header>
    </>
  );
}
export default Navbar;
