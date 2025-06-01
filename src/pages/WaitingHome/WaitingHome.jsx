import Maintitle from "../../components/title/Maintitle";
import FilterGroup from "./FilterGroup";
import "./waitingHome.scss";
import HomeCatCard from "../../components/card/HomeCatCard";
import catList from "../../components/card/catList.js";
function WaitingHome() {
  return (
    <>
      <section className="waiting">
        <Maintitle en="Waiting For Home" cn="帶我回家" />
        <div className="waiting-main">
          <div className="cat-filter-section">
            <div className="filter-group">
              <label>名字</label>
              <div className="input-row">
                <input type="text" placeholder="搜尋" />
              </div>
            </div>

            <FilterGroup title="性別" options={["弟弟", "妹妹"]} />
            <FilterGroup title="花色" options={["白", "橘", "虎斑", "黑"]} />
            <FilterGroup
              title="年齡"
              options={["0~1歲", "1~3歲", "3~5歲", "5~8歲", "8歲以上"]}
            />
            <FilterGroup
              title="貓咪個性"
              options={["穩定", "慢熱", "黏人", "獨立", "話多", "安靜"]}
            />
            <FilterGroup
              title="適合家庭"
              options={[
                "家中沒有貓咪",
                "家中有多隻貓",
                "沒有養過貓咪",
                "曾經養過貓咪",
              ]}
            />
            <FilterGroup
              title="適合的主人"
              options={[
                "工作無法經常陪伴貓",
                "希望貓咪黏人的主人",
                "有耐心照顧生病的貓",
                "願意給兇貓一個機會",
              ]}
            />
          </div>
          <div className="waiting-card">
            {catList.map((cat) => (
              <HomeCatCard
                key={cat.id}
                cat={cat}
                years={cat.years}
                name={cat.name}
                png={cat.png}
                hashtag1={cat.hashtag1}
                hashtag2={cat.hashtag2}
                hashtag3={cat.hashtag3}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
export default WaitingHome;
