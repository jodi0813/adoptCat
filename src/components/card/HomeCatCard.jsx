import { Link } from "react-router-dom";
import CatNameTagHover from "../tag/CatNameTagHover";
import { FaBatteryHalf, FaMars, FaVenus, FaWifi } from "react-icons/fa6";

function HomeCatCard({ id, years, sex, name, png, hashtag = [] }) {
  return (
    <>
      <div className="flex w-[373px] h-[580px] flex-col items-center rounded-[30px] border-3 border-[#604d32] bg-white p-[10px]">
        <div className="flex items-center justify-center gap-[10px] [&_span]:text-2xl [&_span]:font-normal [&_span]:leading-normal [&_img]:h-[30px] [&_img]:w-[30px]">
          <span>{years}</span>
          {sex === "弟弟" ? <FaMars size={24} /> : <FaVenus size={24} />}

          <img
            src="./images/icon-phonehead.svg"
            alt="手機劉海"
            className="w-[138.54px]"
          />
          <FaWifi size={24} />
          <FaBatteryHalf size={24} />
        </div>

        <CatNameTagHover name={name} catColor="#F9D176" textColor="#FFF" />
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col justify-center gap-2">
            <div className="border-4 border-[#f9d176] [&_img]:h-[318.89px] [&_img]:object-contain">
              <img src={png} alt="貓照片" />
            </div>
            <div className="flex gap-[7px]">
              {hashtag.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center justify-center gap-[10px] rounded-full border-3 border-[#f9d176] px-[14px] py-[3px] text-center text-2xl leading-[100.015%] font-normal text-[#604d32]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <Link to={`/waitinghome/catprofile/${id}`}>
            <button className="relative flex h-[50px] w-[142px] items-center justify-center rounded-full bg-[#e2d9a8] px-[21.708px] py-[10px] text-center text-2xl leading-6 font-normal text-[#604d32] before:absolute before:top-[-30px] before:left-5 before:border-20 before:border-transparent before:border-b-[#e2d9a8] before:content-[''] after:absolute after:top-[-30px] after:right-5 after:border-20 after:border-transparent after:border-b-[#e2d9a8] after:content-[''] hover:bg-[#f9d176] hover:text-white hover:before:border-b-[#f9d176] hover:after:border-b-[#f9d176]">
              主子檔案
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
export default HomeCatCard;
