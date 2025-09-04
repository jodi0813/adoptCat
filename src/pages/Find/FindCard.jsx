import "./FindCard.scss";
function FindCard({
  find_pic,
  find_name,
  find_sex,
  find_color,
  find_feature,
  find_time,
  find_location,
  find_owner_name,
  find_phone,
}) {
  return (
    <>
      <div className="findCard">
        <img
          src={find_pic}
          alt="貓咪照片"
          onError={(e) => {
            e.currentTarget.src = "./images/lost_cat1.png";
          }}
        />
        <div className="findCardBody">
          <ul>
            <li>
              <span className="findSmallTitle">寵物名字：</span>
              <span className="findSmallText">{find_name}</span>
            </li>
            <li>
              <span className="findSmallTitle">寵物性別：</span>
              <span className="findSmallText">{find_sex}</span>
            </li>
            <li>
              <span className="findSmallTitle">寵物毛色：</span>
              <span className="findSmallText">{find_color}</span>
            </li>
            <li>
              <span className="findSmallTitle">寵物特徵：</span>
              <span className="findSmallText">{find_feature}</span>
            </li>
            <li>
              <span className="findSmallTitle">遺失時間：</span>
              <span className="findSmallText">{find_time}</span>
            </li>
            <li>
              <span className="findSmallTitle">遺失地點：</span>
              <span className="findSmallText">{find_location}</span>
            </li>
            <li>
              <span className="findSmallTitle">飼主姓名：</span>
              <span className="findSmallText">{find_owner_name}</span>
            </li>
            <li>
              <span className="findSmallTitle">連絡電話：</span>
              <span className="findSmallText">{find_phone}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default FindCard;
