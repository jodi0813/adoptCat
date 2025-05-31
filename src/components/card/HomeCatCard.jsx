import CatNameTagHover from "../tag/CatNameTagHover";
import "./HomeCatCard.scss";

function HomeCatCard({years,name,png,hashtag1,hashtag2,hashtag3}) {
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
       
          <CatNameTagHover name={name} />
           <div className="phoneMain">
          <div className="phoneCat">
            <div className="phoneCatPhoto">
              <img src={png} alt="貓照片" />
            </div>
            <div className="cathashtag">
              <div className="hashtag">{hashtag1}</div>
              <div className="hashtag">{hashtag2}</div>
              <div className="hashtag">{hashtag3}</div>
            </div>
          </div>
          <button className="phoneCatBt">主子檔案</button>
        </div>
      </div>
    </>
  );
}
export default HomeCatCard;
