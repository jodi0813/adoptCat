import { useEffect, useRef, useState } from "react";
import { getCats } from "../../services/catsService";
import HomeCatCard from "../../components/card/HomeCatCard";
import Test from "./Test";
import Button from "../../components/button/Button";
import { useLocation } from "react-router-dom";

// 背景漂浮貓咪的位置與動畫延遲（原 .floatingCat:nth-child(n)）
const floatingCatPositions = [
  { top: "20%", left: "5%", width: "20%", animationDelay: "0s" },
  { top: "40%", left: "70%", width: "20%", animationDelay: "1s" },
  { top: "10%", left: "20%", width: "10%", animationDelay: "3s" },
  { top: "20%", left: "80%", width: "10%", animationDelay: "0.5s" },
  { top: "75%", left: "80%", width: "15%", animationDelay: "0s" },
  { top: "65%", left: "5%", width: "20%", animationDelay: "4s" },
  { top: "45%", left: "20%", width: "10%", animationDelay: "1s" },
  { top: "5%", left: "60%", width: "15%", animationDelay: "2.5s" },
];

// 背景漂浮貓掌的位置與旋轉縮放（原 .floatingPaw:nth-child(n)）
const floatingPawPositions = [
  { top: "5%", left: "20%", transform: "scale(0.5) rotate(0deg)" },
  { top: "15%", left: "70%", transform: "scale(0.8) rotate(30deg)" },
  { top: "50%", left: "10%", transform: "scale(0.9) rotate(-20deg)" },
  { top: "80%", left: "50%", transform: "scale(0.6) rotate(0deg)" },
  { top: "75%", left: "75%", transform: "scale(0.9) rotate(-45deg)" },
  { top: "30%", left: "35%", transform: "scale(0.7) rotate(10deg)" },
  { top: "50%", left: "65%", transform: "scale(1.2) rotate(15deg)" },
  { top: "40%", left: "85%", transform: "scale(0.6) rotate(-60deg)" },
  { top: "77%", left: "24%", transform: "scale(1) rotate(89deg)" },
  { top: "10%", left: "40%", transform: "scale(1) rotate(-90deg)" },
];

// 引言泡泡的位置（原 .quote.q1 / q2 / q3，含 ::after 連接線改用內嵌 span 呈現）
const quotePositions = [
  { bottom: "400px", left: "400px", line: { width: "120px", left: "-115px", bottom: "-10px", rotate: "-30deg" } },
  { bottom: "300px", right: "400px", line: { width: "100px", right: "-100px", bottom: "20px", rotate: "0deg" } },
  { bottom: "170px", left: "350px", line: { width: "80px", left: "-80px", bottom: "40px", rotate: "20deg" } },
];
function HomePage() {
  const [catList, setCatList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;
    getCats()
      .then((cats) => {
        if (!cancelled) setCatList(cats);
      })
      .catch((err) => console.error("讀取貓咪資料失敗:", err));
    return () => {
      cancelled = true;
    };
  }, []);
  const catHeadRefs = [useRef(null), useRef(null), useRef(null)];
  const [peopleWalkActive, setPeopleWalkActive] = useState(false);
  const [catWalkActive, setCatWalkActive] = useState(false);
  const [cardsToShow, setCardsToShow] = useState(3); // 預設是桌機版 3 張
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

  useEffect(() => {
    if (!paused && catList.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % catList.length);
      }, 4000);
    }
    return () => clearInterval(intervalRef.current);
  }, [paused, catList.length]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCardsToShow(1);
      } else if (width < 1025) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };

    handleResize(); // 初始化時先跑一次
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 前後補 1 張，總共顯示 3 張卡
  const visibleCards = [];

  if (catList.length > 0) {
    for (let i = 0; i < cardsToShow; i++) {
      const index =
        (currentIndex - Math.floor(cardsToShow / 2) + i + catList.length) %
        catList.length;
      visibleCards.push(catList[index]);
    }
  }

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
      // 1024px 以下不移動眼睛
      if (window.innerWidth < 1025) return;
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
      <section id="homePage" className="relative h-[1080px] w-full bg-[#fff1a8] p-0 [cursor:url('/images/mouse.png'),auto]">
        <div className="absolute z-0 min-h-full w-full">
          {[...Array(8)].map((_, i) => (
            <img
              key={i}
              src={`./images/bg-cat${i + 1}.png`}
              className="absolute z-10 w-[300px] animate-float"
              style={{
                top: floatingCatPositions[i].top,
                left: floatingCatPositions[i].left,
                width: floatingCatPositions[i].width,
                animationDelay: floatingCatPositions[i].animationDelay,
              }}
              alt={`漂浮貓咪${i + 1}`}
            />
          ))}
          <div className="absolute z-0 h-full w-full">
            {[...Array(10)].map((_, i) => (
              <img
                key={i}
                src="./images/catpaw.svg"
                className="pointer-events-none absolute w-[5%]"
                style={{
                  top: floatingPawPositions[i].top,
                  left: floatingPawPositions[i].left,
                  transform: floatingPawPositions[i].transform,
                }}
                alt={`漂浮貓掌${i + 1}`}
              />
            ))}
          </div>
        </div>
        {/* 前景貓咪與螢幕 */}
        <div className="relative z-10 mx-auto h-screen w-[min(100%,800px)] animate-slide-up-mobile lg:animate-slide-up">
          <div className="relative bottom-[5%] flex items-center justify-center">
            <img
              src="./images/catscreen.svg"
              alt="黑貓插圖"
              className="w-[79%] md:w-[90%]"
            />
            <div className="absolute top-0 left-0 h-full w-full">
              <img
                src="./images/catscreenlefteye.png"
                ref={leftEyeRef}
                className="absolute top-[33%] left-[34%] w-[min(8vw,80px)] transition-transform duration-100 ease-linear md:left-[31%]"
                alt="左眼"
              />
              <img
                src="./images/catscreenrighteye.png"
                ref={rightEyeRef}
                className="absolute top-[33%] left-[57%] w-[min(8vw,80px)] transition-transform duration-100 ease-linear md:left-[58%]"
                alt="右眼"
              />
            </div>
            <div className="absolute z-99 top-[48%] left-[20%] w-[60%] lg:top-1/2 lg:left-[19%] lg:w-[63%]">
              <Test />
            </div>
          </div>
        </div>
      </section>
      <section id="takeMeHome" className="flex h-screen w-full flex-col overflow-hidden bg-[#fff6df]">
        <header className="flex flex-col items-end p-[3%] h-[13%] [&_h2]:font-['Huninn',cursive] [&_h2]:leading-none [&_h2]:font-normal [&_h2]:whitespace-nowrap [&_h2]:text-[#dfc681] [&_h2]:text-[2.5rem] md:h-auto md:[&_h2]:text-[5rem]">
          <h2>Take Me Home</h2>
          {/* <div className="home-title-Bt">
            <Button text="領養流程" />
          </div> */}
        </header>
        <div className="static flex h-full flex-col items-center gap-[4%] lg:relative lg:block lg:h-1/2">
          <div
            className="catHead static top-[20%] left-[3%] h-[220px] w-[340px] rounded-[50%_50%_40%_40%] bg-[#ffe39f] pt-[40px] shadow-[0_4px_10px_rgba(0,0,0,0.05)] md:h-[280px] md:w-[360px] md:pt-[60px] lg:absolute [&_.catear-left]:absolute [&_.catear-left]:top-[-20px] [&_.catear-left]:left-5 [&_.catear-left]:h-0 [&_.catear-left]:w-0 [&_.catear-left]:rotate-[-27deg] [&_.catear-left]:border-r-[40px] [&_.catear-left]:border-b-[60px] [&_.catear-left]:border-l-[40px] [&_.catear-left]:border-r-transparent [&_.catear-left]:border-b-[#ffe39f] [&_.catear-left]:border-l-transparent [&_.catear-right]:absolute [&_.catear-right]:top-[-20px] [&_.catear-right]:right-5 [&_.catear-right]:h-0 [&_.catear-right]:w-0 [&_.catear-right]:rotate-[27deg] [&_.catear-right]:border-r-[40px] [&_.catear-right]:border-b-[60px] [&_.catear-right]:border-l-[40px] [&_.catear-right]:border-r-transparent [&_.catear-right]:border-b-[#ffe39f] [&_.catear-right]:border-l-transparent"
            ref={catHeadRefs[0]}
          >
            <div className="catear-left"></div>
            <div className="catear-right"></div>
            <span className="absolute top-[5px] left-[50px] flex h-10 w-10 items-center justify-center rounded-full bg-white text-[1.5rem] font-bold text-[#444] shadow-[0_2px_4px_rgba(0,0,0,0.1)]">1</span>
            <h3 className="mb-[0.1rem] text-[1.5rem] font-bold text-[#ffa45b] md:mb-2">找到喜歡的貓並送出申請</h3>
            <ul className="m-0 list-none p-0 text-[#604d32] [&_li]:text-[1.2rem] [&_li]:mb-[0.1rem] md:[&_li]:mb-2">
              <li>在網站上找到喜歡的貓咪</li>
              <li>先加入領貓會員後</li>
              <li>填寫基本資料、問卷調查</li>
              <li>按下「我要領養」送出即可</li>
            </ul>
          </div>
          <div
            className="static top-0 left-[35%] h-[220px] w-[340px] rounded-[50%_50%_40%_40%] bg-[#ffe39f] pt-[40px] shadow-[0_4px_10px_rgba(0,0,0,0.05)] md:h-[280px] md:w-[360px] md:pt-[60px] lg:absolute [&_.catear-left]:absolute [&_.catear-left]:top-[-20px] [&_.catear-left]:left-5 [&_.catear-left]:h-0 [&_.catear-left]:w-0 [&_.catear-left]:rotate-[-27deg] [&_.catear-left]:border-r-[40px] [&_.catear-left]:border-b-[60px] [&_.catear-left]:border-l-[40px] [&_.catear-left]:border-r-transparent [&_.catear-left]:border-b-[#ffe39f] [&_.catear-left]:border-l-transparent [&_.catear-right]:absolute [&_.catear-right]:top-[-20px] [&_.catear-right]:right-5 [&_.catear-right]:h-0 [&_.catear-right]:w-0 [&_.catear-right]:rotate-[27deg] [&_.catear-right]:border-r-[40px] [&_.catear-right]:border-b-[60px] [&_.catear-right]:border-l-[40px] [&_.catear-right]:border-r-transparent [&_.catear-right]:border-b-[#ffe39f] [&_.catear-right]:border-l-transparent"
            ref={catHeadRefs[1]}
          >
            <div className="catear-left"></div>
            <div className="catear-right"></div>
            <span className="absolute top-[5px] left-[50px] flex h-10 w-10 items-center justify-center rounded-full bg-white text-[1.5rem] font-bold text-[#444] shadow-[0_2px_4px_rgba(0,0,0,0.1)]">2</span>
            <h3 className="mb-[0.1rem] text-[1.5rem] font-bold text-[#ffa45b] md:mb-2">等待審核與家訪</h3>
            <ul className="m-0 list-none p-0 text-[#604d32] [&_li]:text-[1.2rem] [&_li]:mb-[0.1rem] md:[&_li]:mb-2">
              <li>等待審核成功後</li>
              <li>您會收到信件通知</li>
              <li>將致電與您約家訪及簽約的時間</li>
              <li>最快當日就可以帶貓貓回家囉!</li>
            </ul>
          </div>
          <div
            className="static top-[30%] right-[3%] h-[220px] w-[340px] rounded-[50%_50%_40%_40%] bg-[#ffe39f] pt-[40px] shadow-[0_4px_10px_rgba(0,0,0,0.05)] md:h-[280px] md:w-[360px] md:pt-[60px] lg:absolute [&_.catear-left]:absolute [&_.catear-left]:top-[-20px] [&_.catear-left]:left-5 [&_.catear-left]:h-0 [&_.catear-left]:w-0 [&_.catear-left]:rotate-[-27deg] [&_.catear-left]:border-r-[40px] [&_.catear-left]:border-b-[60px] [&_.catear-left]:border-l-[40px] [&_.catear-left]:border-r-transparent [&_.catear-left]:border-b-[#ffe39f] [&_.catear-left]:border-l-transparent [&_.catear-right]:absolute [&_.catear-right]:top-[-20px] [&_.catear-right]:right-5 [&_.catear-right]:h-0 [&_.catear-right]:w-0 [&_.catear-right]:rotate-[27deg] [&_.catear-right]:border-r-[40px] [&_.catear-right]:border-b-[60px] [&_.catear-right]:border-l-[40px] [&_.catear-right]:border-r-transparent [&_.catear-right]:border-b-[#ffe39f] [&_.catear-right]:border-l-transparent"
            ref={catHeadRefs[2]}
          >
            <div className="catear-left"></div>
            <div className="catear-right"></div>
            <span className="absolute top-[5px] left-[50px] flex h-10 w-10 items-center justify-center rounded-full bg-white text-[1.5rem] font-bold text-[#444] shadow-[0_2px_4px_rgba(0,0,0,0.1)]">3</span>
            <h3 className="mb-[0.1rem] text-[1.5rem] font-bold text-[#ffa45b] md:mb-2">每月固定追蹤</h3>
            <ul className="m-0 list-none p-0 text-[#604d32] [&_li]:text-[1.2rem] [&_li]:mb-[0.1rem] md:[&_li]:mb-2">
              <li>領養完成後</li>
              <li>將開始每月追蹤功能</li>
              <li>每月須於15日前上傳貓咪生活照</li>
              <li>並提供疫苗施打、結紮相關紀錄</li>
            </ul>
          </div>
        </div>
        <div className="relative h-4/5 hidden lg:block">
          <img
            src="./images/peoplewalking.gif"
            alt="人走路動畫"
            className={`absolute bottom-[12%] left-0 z-10 w-[250px] ${peopleWalkActive ? "animate-people-walk-right" : ""}`}
            onAnimationEnd={handlePeopleWalkEnd}
          />
          <img
            src="./images/catgohome.gif"
            alt="貓走路動畫"
            className={`absolute bottom-0 left-[40%] z-15 w-[150px] ${catWalkActive ? "animate-cat-walk-right" : ""}`}
          />
          <img src="./images/house.png" alt="房子圖片" className="absolute right-0 bottom-0 z-0 w-[320px]" />
        </div>
      </section>
      <section id="waitingForHome" className="w-full overflow-hidden bg-[#fff6df]">
        <header className="flex flex-col items-start justify-center p-[3%] h-[13%] [&_h2]:font-['Huninn',cursive] [&_h2]:leading-none [&_h2]:font-normal [&_h2]:whitespace-nowrap [&_h2]:text-[#dfc681] [&_h2]:text-[2.5rem] md:h-auto md:[&_h2]:text-[5rem]">
          <h2>Waiting For Home</h2>
          <div className="flex w-full justify-end">
            <Button text="查看更多" link="/waitinghome" />
          </div>
        </header>

        <div className="relative flex w-full justify-center overflow-hidden">
          <div className="mt-[50px] flex justify-center transition-transform duration-800 ease-in-out gap-[3px] md:gap-6">
            {visibleCards.map((cat, index) => (
              <div
                className="relative flex items-center justify-center flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_30%]"
                key={`${cat.id}-${index}`}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <div className="relative">
                  <HomeCatCard
                    years={cat.years}
                    name={cat.name}
                    png={cat.png}
                    hashtag={cat.hashtag}
                    sex={cat.sex}
                  />
                  {index === 1 && cat.quotes && window.innerWidth >= 1025 && (
                    <div>
                      {cat.quotes.map((q, i) => {
                        const pos = quotePositions[i];
                        return (
                          <div
                            key={i}
                            className="absolute z-10 animate-pop-in border border-[#604d32] bg-white px-3 py-[6px] text-2xl whitespace-nowrap text-[#604d32]"
                            style={{
                              bottom: pos.bottom,
                              left: pos.left,
                              right: pos.right,
                            }}
                          >
                            {q}
                            <span
                              className="absolute h-[3px] bg-[#604d32]"
                              style={{
                                width: pos.line.width,
                                left: pos.line.left,
                                right: pos.line.right,
                                bottom: pos.line.bottom,
                                transform: `rotate(${pos.line.rotate})`,
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="letsGoHome" className="my-[10%] w-full overflow-hidden bg-[#fff6df]">
        <header className="flex flex-col items-center p-[3%] h-[13%] [&_h2]:font-['Huninn',cursive] [&_h2]:leading-none [&_h2]:font-normal [&_h2]:whitespace-nowrap [&_h2]:text-[#dfc681] [&_h2]:text-[2.5rem] md:h-auto md:[&_h2]:text-[5rem]">
          <h2>Let’s Go Home!</h2>
        </header>
        <div className="relative flex justify-end pr-[3%] h-10 [&_img]:absolute [&_img]:right-[100px] [&_img]:w-[min(20%,246px)] [&_img]:object-contain [&_img]:bottom-[-22px] md:h-[180px] md:[&_img]:bottom-[-46px] lg:[&_img]:bottom-[-70px]">
          <img src="./images/catwalkingloop.gif" alt="貓咪走路" />
        </div>
        <div className="relative h-auto w-full">
          <div className="flex w-max animate-scroll-right [&_img]:object-cover [&_img]:object-center [&_img]:h-[200px] [&_img]:w-[300px] md:[&_img]:h-[248px] md:[&_img]:w-full">
            {[1, 2, 3, 4, 1, 2, 3, 4].map((i, index) => (
              <img
                key={index}
                src={`./images/group${i}.jpg`}
                alt={`貓合照${i}`}
              />
            ))}
          </div>
        </div>
        <div className="m-[6px] w-full bg-transparent whitespace-nowrap">
          <div className="flex animate-scroll-text gap-[50px] pl-full [&_span]:leading-normal [&_span]:font-normal [&_span]:tracking-[4.8px] [&_span]:text-[#604d32] [&_span]:text-base md:[&_span]:text-[1.5rem]">
            <span>每隻貓咪都值得擁有一個溫暖的家</span>
            <span>給貓咪一個家，也給自己一份無盡的溫暖</span>
            <span>給牠一個家，牠會給你一個世界</span>
            <span>領養代替購買</span>
          </div>
        </div>
        <div className="relative h-auto w-full">
          <div className="flex w-max animate-scroll-right [&_img]:object-cover [&_img]:object-center [&_img]:h-[200px] [&_img]:w-[300px] md:[&_img]:h-[248px] md:[&_img]:w-full">
            {[5, 6, 7, 1, 5, 6, 7, 1].map((i, index) => (
              <img
                key={index}
                src={`./images/group${i}.jpg`}
                alt={`貓合照${i}`}
              />
            ))}
          </div>
        </div>
      </section>
      <section id="about" className="flex h-[90vh] w-full overflow-hidden flex-col md:flex-row">
        <div className="relative flex-1 overflow-hidden h-screen w-full md:w-1/2 after:absolute after:inset-0 after:rounded-[inherit] after:bg-[rgba(245,166,63,0.1)] after:content-[''] after:pointer-events-none [&_img]:block [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_img]:object-center">
          <img src="./images/about.jpg" alt="貓跟人手的照片" />
        </div>
        <div className="flex flex-1 flex-col self-center text-[#604d32] gap-[15px] pt-5 md:gap-14 md:pt-0">
          <h1 className="text-[1.5rem] leading-[150%] font-medium">關於領貓</h1>
          <div className="flex flex-col gap-[15px] whitespace-nowrap [&_span]:text-[1.1rem] [&_span]:leading-[194%] [&_span]:font-normal">
            <span>你是不是也曾想領養貓咪</span>
            <span>卻被問東問西，最後又沒有下文？</span>
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
