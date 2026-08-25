import { Link } from "react-router-dom";
import CatNameTagHover from "../tag/CatNameTagHover";
import { FaBatteryHalf, FaMars, FaVenus, FaWifi } from "react-icons/fa6";

const iconSmallClass = "text-[27px] max-[821px]:text-2xl max-[767px]:text-base";

function HomeCatCardSmall({ id, years, sex, name, png, hashtag = [] }) {
  return (
    <>
      <div className="flex  max-w-[280px] flex-col items-center rounded-[30px] border-3 border-[#604d32] bg-white p-[6px] min-[1024px]:min-h-[480px] max-[767px]:mb-[10px] max-[767px]:h-[30%] max-[767px]:w-[48%]">
        <div className="flex w-full items-center justify-center gap-[4%] [&_span]:text-base [&_span]:font-normal [&_span]:leading-normal [&_img]:h-[15px] [&_img]:w-[15px]">
          <span>{years}</span>
          {sex === "弟弟" ? <FaMars className={iconSmallClass} /> : <FaVenus className={iconSmallClass} />}

          <img
            src="./images/icon-phonehead.svg"
            alt="手機劉海"
            className="w-20"
          />
          <FaWifi className={iconSmallClass} />
          <FaBatteryHalf className={iconSmallClass} />
        </div>

        <CatNameTagHover name={name} catColor="#F9D176" textColor="#FFF" />
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col justify-center gap-2">
            <div className="h-full border-4 border-[#f9d176] [&_img]:h-full [&_img]:w-full [&_img]:object-contain">
              <img src={png} alt="貓照片" />
            </div>
            <div className="flex gap-[2px]">
              {hashtag.map((tag, index) => (
                <span
                  key={index}
                  className="flex w-1/4 items-center justify-center gap-[10px] rounded-full border-3 border-[#f9d176] p-[3px] text-center text-base leading-[100.015%] font-normal text-[#604d32] max-[767px]:w-[33%]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <Link to={`/waitinghome/catprofile/${id}`}>
            <button className="relative flex h-[35px] w-[100px] items-center justify-center rounded-full bg-[#e2d9a8] px-[10px] py-[2px] text-center text-base leading-[12px] font-normal text-[#604d32] before:absolute before:top-[-30px] before:left-5 before:border-20 before:border-transparent before:border-b-[#e2d9a8] before:content-[''] after:absolute after:top-[-30px] after:right-5 after:border-20 after:border-transparent after:border-b-[#e2d9a8] after:content-[''] hover:bg-[#f9d176] hover:text-white hover:before:border-b-[#f9d176] hover:after:border-b-[#f9d176]">
              主子檔案
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
export default  HomeCatCardSmall;
