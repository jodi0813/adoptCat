import { Link } from "react-router-dom";
import CatNameTagHover from "../tag/CatNameTagHover";
import "./HomeCatCard.scss";


function HomeCatCard({ years, name, png,hashtag = [] }) {
  return (
    <>
      <div className="phoneCard">
        <div className="phoneHead">
          <span>{years}</span>
          <img src="./images/icon-sex.svg" alt="性別" />
          <img
            src="./images/icon-phonehead.svg"
            alt="手機劉海"
            className="icon-phonehead"
          />
          <img src="./images/icon-wifi.svg" alt="wifi" />
          <img src="./images/icon-battery.svg" alt="電量" />
        </div>

        <CatNameTagHover name={name} catColor="#F8B600" textColor="#FFF" />
        <div className="phoneMain">
          <div className="phoneCat">
            <div className="phoneCatPhoto">
              <img src={png} alt="貓照片" />
            </div>
            <div className="cathashtag">
              {hashtag.map((tag,index)=>(
              <span key={index} className="hashtag">{tag}</span>
              ))}
            </div>
          </div>
          <Link to="/waitinghome/catprofile">
            <button className="phoneCatBt">主子檔案</button></Link>
        </div>
      </div>
    </>
  );
}
export default HomeCatCard;
