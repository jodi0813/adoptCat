import { Link, useLocation, useNavigate } from "react-router-dom";
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
      <header
        id="navbar"
        className="fixed top-0 left-0 z-999 box-border flex w-full items-center justify-between px-5 max-[767px]:px-[10px]"
      >
        <div className="max-[767px]:w-[80px] [&_a]:inline-block [&_img]:block [&_img]:w-full [&_img]:h-auto">
          <Link to="/">
            <img src="./images/logo_navbar.png" alt="網站LOGO" />
          </Link>
        </div>
        <div className="flex w-full items-center justify-end">
          <button
            className="relative z-[200] hidden cursor-pointer border-none bg-none p-[10px] text-[2rem] max-[767px]:flex"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="開啟選單"
          >
            <img src="./images/catFootprint.png" alt="漢堡按鈕" />
          </button>
          <div
            className={`flex w-4/5 items-center justify-end max-[767px]:justify-center max-[767px]:absolute max-[767px]:top-0 max-[767px]:right-0 max-[767px]:z-[100] max-[767px]:h-[80vh] max-[767px]:w-screen max-[767px]:flex-col max-[767px]:items-end max-[767px]:bg-white ${
              menuOpen ? "max-[767px]:flex" : "max-[767px]:hidden"
            }`}
          >
            <nav className="w-full">
              <ul className="flex items-center justify-end gap-[4%] rounded-full px-5 py-[5px] max-[767px]:flex-col max-[767px]:gap-16 max-[767px]:px-0">
                <li
                  className="inline-block cursor-pointer bg-gradient-to-r from-[#604d32] from-50% to-[#daa001] to-50% bg-[length:200%_100%] bg-left-bottom bg-clip-text text-[1.2rem] leading-normal font-semibold text-transparent transition-[background-position] duration-400 ease-in-out hover:bg-right-bottom max-[767px]:text-[1.5rem]"
                  onClick={() => { setMenuOpen(false); handleScrollToTAbout(); }}
                >
                  關於我們
                </li>
                <li className="inline-block cursor-pointer bg-gradient-to-r from-[#604d32] from-50% to-[#daa001] to-50% bg-[length:200%_100%] bg-left-bottom bg-clip-text text-[1.2rem] leading-normal font-semibold text-transparent transition-[background-position] duration-400 ease-in-out hover:bg-right-bottom max-[767px]:text-[1.5rem]">
                  <Link to="/find" onClick={()=>setMenuOpen(false)}>遺失協尋</Link>
                </li>
                <li
                  className="inline-block cursor-pointer bg-gradient-to-r from-[#604d32] from-50% to-[#daa001] to-50% bg-[length:200%_100%] bg-left-bottom bg-clip-text text-[1.2rem] leading-normal font-semibold text-transparent transition-[background-position] duration-400 ease-in-out hover:bg-right-bottom max-[767px]:text-[1.5rem]"
                  onClick={() => { setMenuOpen(false); handleScrollToTakeMeHome(); }}
                >
                  領養流程
                </li>
                <li className="inline-block cursor-pointer bg-gradient-to-r from-[#604d32] from-50% to-[#daa001] to-50% bg-[length:200%_100%] bg-left-bottom bg-clip-text text-[1.2rem] leading-normal font-semibold text-transparent transition-[background-position] duration-400 ease-in-out hover:bg-right-bottom max-[767px]:text-[1.5rem]">
                  <Link to="/waitinghome" onClick={() => setMenuOpen(false)}>帶我回家</Link>
                </li>
                <li className="inline-block cursor-pointer bg-gradient-to-r from-[#604d32] from-50% to-[#daa001] to-50% bg-[length:200%_100%] bg-left-bottom bg-clip-text text-[1.2rem] leading-normal font-semibold text-transparent transition-[background-position] duration-400 ease-in-out hover:bg-right-bottom max-[767px]:text-[1.5rem]">
                  <Link to="/adoptqa" onClick={() => setMenuOpen(false)}>常見問題</Link>
                </li>

                <li className="inline-block cursor-pointer text-[1.2rem] leading-normal font-semibold max-[767px]:text-[1.5rem]">
                  <Link to="/gohome" onClick={() => setMenuOpen(false)}>
                    <button
                      type="button"
                      className="group relative flex flex-col items-center bg-transparent p-0 text-[#604d32] [&_span]:text-[#604d32]"
                    >
                      <img className="block transition-opacity duration-1000 group-hover:opacity-0" src="./images/houseBt.png" alt="回家按鈕" />
                      <img
                        src="./images/catback.svg"
                        alt="回家按鈕hover"
                        className="absolute top-[10px] left-5 hidden group-hover:absolute group-hover:top-0 group-hover:left-[10px] group-hover:block group-hover:w-10 group-hover:opacity-100"
                      />
                    </button>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
export default Navbar;
