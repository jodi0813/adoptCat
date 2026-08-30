import { Link } from "react-router-dom";
import {
  gohomeSectionClass,
  gohomeLeftEarClass,
  gohomeRightEarClass,
  gohomeBoxClass,
} from "./gohomeShellClasses";

function GoHome() {
  return (
    <>
      <section id="gohome" className={gohomeSectionClass}>
        {/* 左耳 */}
        <div className={gohomeLeftEarClass}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="271"
            height="210"
            viewBox="0 0 271 210"
            fill="none"
          >
            <path
              d="M144.506 0.804903C200.79 1.01477 237.927 145.728 268.127 184.104C298.326 222.48 16.5937 214.301 1.65421 184.104C-13.2853 153.907 88.2215 0.595039 144.506 0.804903Z"
              fill="#fff"
            />
          </svg>
        </div>

        {/* 右耳 */}
        <div className={gohomeRightEarClass}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="271"
            height="209"
            viewBox="0 0 271 209"
            fill="none"
          >
            <path
              d="M136.287 0.805664C193.733 16.44 283.046 154.203 268.97 182.658C254.028 212.855 -27.7009 221.034 2.49843 182.658C24.868 154.232 51.045 67.4618 85.9896 24.293L130.526 43.4375L136.287 0.805664Z"
              fill="#fff"
            />
          </svg>
        </div>
        <div className={gohomeBoxClass}>
          <div className="flex flex-1 items-center justify-center mb-[10%] lg:mb-0">
            <button className="flex flex-col items-center justify-center gap-[5%] rounded-full border-3 border-[#ff630f] bg-white hover:bg-[#f8c1a4] min-w-[260px] p-[15%] md:p-[5%] lg:min-w-[330px] [&_span]:text-center [&_span]:text-[2rem] [&_span]:leading-normal [&_span]:font-bold [&_span]:tracking-[3.2px] [&_span]:text-[#604d32] hover:[&_span]:text-white [&_img]:h-1/2 [&_img]:w-full [&_img]:max-h-[200px]">
              <Link to="/gohome/adopt" >
                <span>申請領養貓咪</span>
                <img src="./images/gohome1.png" alt="領養插圖" />
              </Link>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center mb-[10%] lg:mb-0">

            <button className="flex flex-col items-center justify-center gap-[5%] rounded-full border-3 border-[#ff630f] bg-white hover:bg-[#f8c1a4] min-w-[260px] p-[15%] md:p-[5%] lg:min-w-[330px] [&_span]:text-center [&_span]:text-[2rem] [&_span]:leading-normal [&_span]:font-bold [&_span]:tracking-[3.2px] [&_span]:text-[#604d32] hover:[&_span]:text-white [&_img]:h-1/2 [&_img]:w-full [&_img]:max-h-[200px]">
              <Link to="/gohome/follow" >
                <span>每月領養追蹤</span>
                <img src="./images/gohome2.png" alt="追蹤插圖" />
              </Link>
            </button>

          </div>
        </div>
      </section>
    </>
  );
}
export default GoHome;
