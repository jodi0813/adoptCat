import CatPawRating from "./CatPawRating";
import "./CatProfile.scss";
import CatNameTagAuto from "../../components/tag/CatNameTagAuto";

function CatProfile() {
  return (
    <>
      <section id="catProfile">
        <div className="profilehead">
          <div className="profileLeft">
            <header className="profileHeader">
              <div className="profileTitle">
                <img src="./images/catpawbrown.svg" alt="標題圖示" />
                <h2>豆漿</h2>
                <img src="./images/catpawbrown.svg" alt="標題圖示" />
              </div>
              <div className="profileSubTitle">妹妹/ 1歲/ 橘貓</div>
            </header>
            <div>
              <img
                src="./images/profile1.png"
                alt="貓咪頭貼"
                className="profilePhotoBig"
              />
              <div>
                <img
                  src="./images/profile2.svg"
                  alt="貓咪頭貼"
                  className="profilePhotoSmall"
                />
                <img
                  src="./images/profile2.svg"
                  alt="貓咪頭貼"
                  className="profilePhotoSmall"
                />
              </div>
            </div>
          </div>
          <div className="profileRight">
            <CatNameTagAuto name="貓咪性格" catColor="#CAB271" />
            <div className="catPawRatingBox">
              <div>
                <CatPawRating
                  attribute="活動力"
                  low="文靜"
                  hight="活潑"
                  level1="#FFC37D"
                  level2="#FFC37D"
                  level3="#FFC37D"
                />
                <CatPawRating
                  attribute="適應力"
                  low="低"
                  hight="高"
                  level1="#FFC37D"
                  level2="#FFC37D"
                />
              </div>
              <div>
                <CatPawRating
                  attribute="社交力"
                  low="不親貓"
                  hight="親貓"
                  level1="#FFC37D"
                  level2="#FFC37D"
                />
                <CatPawRating
                  attribute="依賴力"
                  low="獨立"
                  hight="黏人"
                  level1="#FFC37D"
                  level2="#FFC37D"
                  level3="#FFC37D"
                  level4="#FFC37D"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="profileMain">
          <div className="profileBox">
            <CatNameTagAuto name="背景故事" catColor="#CAB271" />
            <div className="profileDetail">
              豆漿是一隻在廢棄空地被發現的小橘貓，當時牠孤零零地躲在一個紙箱裡，身上還有一點小擦傷。我們救援人員靠近時，牠沒有逃跑，只用那雙圓圓的眼睛靜靜望著大家，
              彷彿一直在等待著我們來救牠。
            </div>
          </div>
          <div className="profileBox">
            <CatNameTagAuto name="貓咪個性" catColor="#CAB271" />
            <div className="profileDetail">
              豆漿個性比較溫和，第一次見到牠雖然眼神有點害怕，但只要給牠幾天的時間適應，開始會跟人撒嬌，只要多花時間陪牠，相信牠會是一隻非常黏人的小可愛。
            </div>
          </div>
          <div className="profileBox">
            <CatNameTagAuto name="領養條件" catColor="#CAB271" />
            <div className="profileDetail">
              1. 23歲以上 2. 有穩定收入 3. 適合新手 4. 可以多貓家庭
            </div>
          </div>

          <div className="profileBox">
            <CatNameTagAuto name="健康狀態" catColor="#CAB271" />
            <div className="profileDetail">結紮</div>
          </div>
          <div className="profileBox">
            <CatNameTagAuto name="貓咪喜好" catColor="#CAB271" />
            <div className="profileDetail">貓肉泥</div>
          </div>
          <div className="profileBox">
            <CatNameTagAuto name="領貓想說" catColor="#CAB271" />
            <div className="profileDetail">
              豆漿雖然是一隻親人的貓咪，但我們發現當牠跟人們玩到太興奮的時候，容易突然地咬人一下(不會太大力)，帶回家可能要再耐心教導唷!
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default CatProfile;
