import { Link } from "react-router-dom";
import CatNameTagHover from "../tag/CatNameTagHover";
import "./HomeCatCardSmall.scss";
import { FaBatteryHalf, FaMars, FaVenus, FaWifi } from "react-icons/fa6";

function HomeCatCardSmall({ years, sex, name, png, hashtag = [] }) {
  return (
    <>
      <div className="phoneCardSmall">
        <div className="phoneHeadSmall">
          <span>{years}</span>
          {sex === "弟弟" ? <FaMars className="iconSmall" /> : <FaVenus className="iconSmall" />}

          <img
            src="./images/icon-phonehead.svg"
            alt="手機劉海"
            className="icon-phoneheadSmall"
          />
          <FaWifi className="iconSmall" />
          <FaBatteryHalf className="iconSmall" />
        </div>

        <CatNameTagHover name={name} catColor="#F9D176" textColor="#FFF" />
        <div className="phoneMainSmall">
          <div className="phoneCatSmall">
            <div className="phoneCatPhotoSmall">
              <img src={png} alt="貓照片" />
            </div>
            <div className="cathashtagtSmall">
              {hashtag.map((tag, index) => (
                <span key={index} className="hashtagtSmall">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <Link to="/waitinghome/catprofile">
            <button className="phoneCatBttSmall">主子檔案</button>
          </Link>
        </div>
      </div>
    </>
  );
}
export default  HomeCatCardSmall;
