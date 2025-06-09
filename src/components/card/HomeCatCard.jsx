import { Link } from "react-router-dom";
import CatNameTagHover from "../tag/CatNameTagHover";
import "./HomeCatCard.scss";
import { FaBatteryHalf, FaMars, FaVenus, FaWifi } from "react-icons/fa6";

function HomeCatCard({ years, sex, name, png, hashtag = [] }) {
  return (
    <>
      <div className="phoneCard">
        <div className="phoneHead">
          <span>{years}</span>
          {sex === "弟弟" ? <FaMars size={24} /> : <FaVenus size={24} />}

          <img
            src="./images/icon-phonehead.svg"
            alt="手機劉海"
            className="icon-phonehead"
          />
          <FaWifi size={24} />
          <FaBatteryHalf size={24} />
        </div>

        <CatNameTagHover name={name} catColor="#F9D176" textColor="#FFF" />
        <div className="phoneMain">
          <div className="phoneCat">
            <div className="phoneCatPhoto">
              <img src={png} alt="貓照片" />
            </div>
            <div className="cathashtag">
              {hashtag.map((tag, index) => (
                <span key={index} className="hashtag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <Link to="/waitinghome/catprofile">
            <button className="phoneCatBt">主子檔案</button>
          </Link>
        </div>
      </div>
    </>
  );
}
export default HomeCatCard;
