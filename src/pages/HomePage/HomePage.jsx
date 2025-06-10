import { useEffect, useRef, useState } from "react";
import catList from "../../components/card/catList";
import HomeCatCard from "../../components/card/HomeCatCard";
import "./HomePage.scss";
import Test from "./Test";
import Button from "../../components/button/Button";
import { useLocation } from "react-router-dom";
function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);
  const location = useLocation();
  const catHeadRefs = [useRef(null), useRef(null), useRef(null)];
  const [peopleWalkActive, setPeopleWalkActive] = useState(false);
  const [catWalkActive, setCatWalkActive] = useState(false);
  useEffect(() => {
    if (location.state?.scrollTo === "takeMeHome") {
      const section = document.getElementById("takeMeHome");
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);
  useEffect(() => {
    function onScroll() {
      const section = document.getElementById("takeMeHome");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setPeopleWalkActive(true);
          setCatWalkActive(true); // 兩個動畫一起啟動
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 只有 peopleWalkActive 為 true 時才監聽動畫結束
  const handlePeopleWalkEnd = () => {
    // 再次確認區塊還在畫面內才啟動
    const section = document.getElementById("takeMeHome");
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setCatWalkActive(true);
      }
    }
  };
  // 前後補 1 張，總共顯示 3 張卡
  const visibleCards = [
    catList[(currentIndex - 1 + catList.length) % catList.length],
    catList[currentIndex],
    catList[(currentIndex + 1) % catList.length],
  ];

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % catList.length);
      }, 4000);
    }
    return () => clearInterval(intervalRef.current);
  }, [paused]);

  useEffect(() => {
    function onScroll() {
      for (let idx = 0; idx < catHeadRefs.length; idx++) {
        const ref = catHeadRefs[idx];
        if (!ref.current) continue;
        const rect = ref.current.getBoundingClientRect();
        // 只有前一個已經 show，這個才允許 show
        const prevShow =
          idx === 0 || catHeadRefs[idx - 1].current.classList.contains("show");
        if (
          rect.top < window.innerHeight - 100 &&
          !ref.current.classList.contains("show") &&
          prevShow
        ) {
          ref.current.classList.add("show");
          break; // 一次只顯示一個
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onScroll() {
      const section = document.getElementById("takeMeHome");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setPeopleWalkActive(true);
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      moveEye(leftEyeRef.current, e.clientX, e.clientY);
      moveEye(rightEyeRef.current, e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const moveEye = (eyeElement, mouseX, mouseY) => {
    if (!eyeElement) return;
    const rect = eyeElement.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    const dx = mouseX - eyeCenterX;
    const dy = mouseY - eyeCenterY;
    const angle = Math.atan2(dy, dx);
    const radius = Math.min(8, rect.width * 0.25); // 響應式範圍

    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    eyeElement.style.transform = `translate(${x}px, ${y}px)`;
  };

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
              src="./images/catscreen.svg"
              alt="黑貓插圖"
              className="mainCatIllustration"
            />
            <div className="eyes">
              <img
                src="./images/catscreenlefteye.png"
                ref={leftEyeRef}
                className="eye left-eye"
                alt="左眼"
              />
              <img
                src="./images/catscreenrighteye.png"
                ref={rightEyeRef}
                className="eye right-eye"
                alt="右眼"
              />
            </div>
          </div>
          <div className="screen">
            <Test />
          </div>
        </div>
      </section>
      <section id="takeMeHome">
        <header className="home-title">
          <h2>Take Me Home</h2>
          <Button text="領養流程" />
        </header>
        <div className="catHeadContainer">
          <div className="catHead catHead1" ref={catHeadRefs[0]}>
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
          <div className="catHead catHead2" ref={catHeadRefs[1]}>
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
          <div className="catHead catHead3" ref={catHeadRefs[2]}>
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
        </div>
        <div className="peopleWalk">
          <img
            src="./images/peoplewalking.gif"
            alt="人走路動畫"
            className={`peopleWalking${peopleWalkActive ? " animate" : ""}`}
            onAnimationEnd={handlePeopleWalkEnd}
          />
          <img
            src="./images/catgohome.gif"
            alt="貓走路動畫"
            className={`catWaking${catWalkActive ? " animate" : ""}`}
          />
          <img src="./images/house.png" alt="房子圖片" className="house" />
        </div>
      </section>
      <section id="waitingForHome">
        <header className="home-title">
          <Button text="查看更多" />
          <h2>Waiting A Home</h2>
        </header>

        <div className="carousel-cats">
          <div className="carousel-track">
            {visibleCards.map((cat, index) => (
              <div
                className="carousel-item"
                key={`${cat.id}-${index}`}
              // onMouseEnter={() => setPaused(true)}
              // onMouseLeave={() => setPaused(false)}
              >
                <div className="cat-quotes-wrapper">
                  <HomeCatCard
                    years={cat.years}
                    name={cat.name}
                    png={cat.png}
                    hashtag={cat.hashtag}
                    sex={cat.sex}
                  />
                  {index === 1 && cat.quotes && (
                    <div className="quotes">
                      {cat.quotes.map((q, i) => (
                        <div className={`quote q${i + 1}`} key={i}>
                          {q}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="letsGoHome">
        <header className="home-title">
          <h2>Let’s Go Home!</h2>
        </header>
        <div className="catWalk">
          <img src="./images/catwalkingloop.gif" alt="貓咪走路" />
        </div>
        <div className="photoCarouselBox">
          <div className="photoCarousel">
            {[1, 2, 3, 4, 1, 2, 3, 4].map((i, index) => (
              <img
                key={index}
                src={`./images/group${i}.png`}
                alt={`貓合照${i}`}
              />
            ))}
          </div>
        </div>
        <div className="textCarouseBox">
          <div className="textCarouse">
            <span>每隻貓咪都值得擁有一個溫暖的家</span>
            <span>給貓咪一個家，也給自己一份無盡的溫暖</span>
            <span>給牠一個家，牠會給你一個世界</span>
            <span>領養代替購買</span>
          </div>
        </div>
        <div className="photoCarouselBox">
          <div className="photoCarousel photoCarouselLeft">
            {[5, 6, 7, 1, 5, 6, 7, 1].map((i, index) => (
              <img
                key={index}
                src={`./images/group${i}.png`}
                alt={`貓合照${i}`}
              />
            ))}
          </div>
        </div>
      </section>
      <section id="about">
        <div className="aboutPhoto">
          <img src="./images/about.jpg" alt="貓跟人手的照片" />
        </div>
        <div className="aboutTextBox">
          <h1>關於領貓</h1>
          <div className="aboutText">
            <span>你是不是也曾想領養貓，卻被問東問西，最後又沒有下文？</span>
            <span>我們幫你省下繁瑣對話，輕鬆又安心找到命定主子 </span>
            <span>透過線上審核，讓你可以即時掌握進度；</span>
            <span>領養後也能在網站上定期追蹤回報，不必私訊往返。</span>
            <span>我們希望建立起透明又溫暖的互信關係，</span>
            <span>讓我們一起，守護每隻貓的幸福。</span>
          </div>
        </div>
      </section>
    </>
  );
}
export default HomePage;
