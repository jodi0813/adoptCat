import { Link, useLocation, useNavigate } from "react-router-dom";
function Footer() {
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
      <div className="relative mt-[150px] flex w-full items-center justify-center gap-[10px] rounded-t-[99px] bg-[#e2d9a8] max-[767px]:mt-[10%] h-[200px] max-[767px]:rounded-none">
        <div className="absolute top-[-100px] z-0 flex max-[767px]:hidden">
          {/* 左耳 */}
          <div className="absolute right-[3vw]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="271"
              height="210"
              viewBox="0 0 271 210"
              fill="none"
            >
              <path
                d="M144.506 0.804903C200.79 1.01477 237.927 145.728 268.127 184.104C298.326 222.48 16.5937 214.301 1.65421 184.104C-13.2853 153.907 88.2215 0.595039 144.506 0.804903Z"
                fill="#E2D9A8"
              />
            </svg>
          </div>

          {/* 右耳 */}
          <div className="absolute left-[7vw]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="271"
              height="209"
              viewBox="0 0 271 209"
              fill="none"
            >
              <path
                d="M136.287 0.805664C193.733 16.44 283.046 154.203 268.97 182.658C254.028 212.855 -27.7009 221.034 2.49843 182.658C24.868 154.232 51.045 67.4618 85.9896 24.293L130.526 43.4375L136.287 0.805664Z"
                fill="#E2D9A8"
              />
            </svg>
          </div>
        </div>
        <div className="z-1 flex w-full items-center justify-center text-[1.2rem] leading-normal font-semibold text-white not-italic">
          <img className="w-[10%]" src="./images//logo_navbar.png" alt="網站LOGO" />
          <div className="flex flex-col gap-[17px]">
            <ul className="flex gap-[30px]">
              <li
                className="cursor-pointer text-[1rem] text-white hover:text-[#604d32] [&_a]:text-white [&_a:hover]:text-[#604d32]"
                onClick={() => handleScrollToTAbout()}
              >
                關於我們
              </li>
              <li
                className="cursor-pointer text-[1rem] text-white hover:text-[#604d32] [&_a]:text-white [&_a:hover]:text-[#604d32]"
                onClick={() => handleScrollToTakeMeHome()}
              >
                領養流程
              </li>
              <li className="cursor-pointer text-[1rem] text-white hover:text-[#604d32] [&_a]:text-white [&_a:hover]:text-[#604d32]">
                <Link to="/waitinghome">帶我回家</Link>
              </li>
              <li className="cursor-pointer text-[1rem] text-white hover:text-[#604d32] [&_a]:text-white [&_a:hover]:text-[#604d32]">
                <Link to="/adoptqa">常見問題</Link>
              </li>
            </ul>
            <span className="text-[1rem]">電話：(02)2533-6666</span>
            <span className="text-[1rem]">地址：台北市中正區領貓路一段66號</span>
            <span className="text-[1rem]">© Companyright 2025. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </>
  );
}
export default Footer;
