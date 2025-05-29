import HomeCatCard from "../../components/card/HomeCatCard";
import "./HomePage.scss";
function HomePage() {
  return (
    <>
      <section id="homePage">
        <div className="catBackground">
          {[...Array(8)].map((_, i) => (
            <img
              key={i}
              src={`./images/bg-cat${i + 1}.png`}
              className="floatingCat"
              alt={`漂浮貓咪${i + 1}`}
            />
          ))}
          <div className="pawBackground">
            {[...Array(10)].map((_, i) => (
              <img
                key={i}
                src="./images/catpaw.svg"
                className="floatingPaw"
                alt={`漂浮貓掌${i + 1}`}
              />
            ))}
          </div>
        </div>
        {/* 前景貓咪與螢幕 */}
        <div className="mainHero">
          <div className="catContainer">
            <img
              src="./images/catscreen.png"
              alt="黑貓插圖"
              className="mainCatIllustration"
            />
            {/* <div className="eye left" ref={leftEyeRef}></div>
            <div className="eye right" ref={rightEyeRef}></div> */}
          </div>

          <div className="screen">
            <div>
              <img src="./images/screen.png" alt="" />
            </div>
            <button className="testBt" onClick={() => navigate("/quiz")}>
              <img src="./images/testbt.png" alt="" />
            </button>
          </div>
        </div>
      </section>
      <section id="takeMeHome">
        <header className="home-title">
          <h2>Take Me Home</h2>
          <button >
            詳細流程
            <img src="./images/catFootprint.png" alt="貓腳印" />
          </button>
        </header>
        <div className="catHead catHead1">
          <div className="catear-left"></div>
          <div className="catear-right"></div>
          <span className="catHead-number">1</span>
          <h3 className="highlight">找到喜歡的貓並送出申請</h3>
          <ul>
            <li>在網站上找到喜歡的貓咪</li>
            <li>先加入領貓會員後</li>
            <li>填寫基本資料、問卷調查</li>
            <li>按下「我要領養」送出即可</li>
          </ul>
        </div>
        <div className="catHead catHead2">
          <div className="catear-left"></div>
          <div className="catear-right"></div>
          <span className="catHead-number">2</span>
          <h3 className="highlight">等待審核與家訪</h3>
          <ul>
            <li>等待審核成功後</li>
            <li>您會收到信件通知</li>
            <li>將致電與您約家訪及簽約的時間</li>
            <li>最快當日就可以帶貓貓回家囉!</li>
          </ul>
        </div>
        <div className="catHead catHead3">
          <div className="catear-left"></div>
          <div className="catear-right"></div>
          <span className="catHead-number">3</span>
          <h3 className="highlight">每月固定追蹤</h3>
          <ul>
            <li>領養完成後</li>
            <li>將開始每月追蹤功能</li>
            <li>每月須於15日前上傳貓咪生活照</li>
            <li>並提供疫苗施打、結紮相關紀錄</li>
          </ul>
        </div>
      </section>
      <section id="WaitingAHome">
        <header className="home-title">
          <button >
            查看更多
            <img src="./images/catFootprint.png" alt="貓腳印" />
          </button>
          <h2>Waiting A Home</h2>
        </header>
        <HomeCatCard/>
      </section>
    </>
  );
}
export default HomePage;
