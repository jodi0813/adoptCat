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
              options={["0~1歲", "1~3歲", "3~5歲", "5歲以上"]}
            />
            <FilterGroup
              title="貓咪個性"
              options={["穩定", "慢熱", "黏人", "獨立", "話多", "撒嬌"]}
            />
            <FilterGroup
              title="適合家庭"
              options={[
                "沒有貓咪",
                "有其他貓",
              ]}
            />
            <FilterGroup
              title="養貓經驗"
              options={[
                "沒養過貓",
                "有養過貓",
              ]}
            />
            <FilterGroup
              title="請給這些貓一個機會"
              options={[
                "我有耐心照顧生病的貓",
                "我願意給兇貓一個機會",
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
                hashtag={cat.hashtag}

              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
export default WaitingHome;
