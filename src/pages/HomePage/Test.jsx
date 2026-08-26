import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Test() {
  const navigate = useNavigate();

  const questions = [
    {
      question: "你想要領養什麼樣個性的主子？",
      options: [
        "很親人常常對我撒嬌",
        "陪伴型，不要過多打擾",
        "習慣及性格穩定比較重要",
      ],
      scores: ["黏人", "獨立", "穩定"],
      type: "hashtag",
    },
    {
      question: "家中是否有其他貓咪?",
      options: ["否", "是", "有計畫養第二隻貓"],
      scores: ["沒有貓咪", "有其他貓", "有其他貓"],
      type: "catFriendly",
    },
    {
      question: "你是否有養貓經驗?",
      options: ["否", "是"],
      scores: ["沒養過貓", "有養過貓"],
      type: "experienced",
    },
    {
      question: "你想要領養多大的貓?",
      options: [
        "我只想養幼貓",
        "我想要個性穩定的成貓",
        "我願意給老貓一個家",
      ],
      scores: ["0~1歲", "1~3歲", "5歲以上"],
      type: "old",
    },
  ];

  const [start, setStart] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState({
    hashtag: [],
    catFriendly: "",
    experienced: "",
    old: "",
  });

  const handleNext = () => {
    const current = questions[currentQuestion];
    const score = current.scores[selected];
    const type = current.type;

    setAnswers((prev) => {
      if (type === "hashtag") {
        return { ...prev, hashtag: [...prev.hashtag, score] };
      }
      return { ...prev, [type]: score };
    });

    setSelected(null);
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleSubmit = () => {
    const params = new URLSearchParams();
    if (answers.old) params.append("old", answers.old);
    if (answers.catFriendly) params.append("catFriendly", answers.catFriendly);
    if (answers.experienced) params.append("experienced", answers.experienced);
    if (answers.hashtag.length > 0) {
      answers.hashtag.forEach((tag) => params.append("hashtag", tag));
    }
    navigate(`/waitinghome?${params.toString()}`);
  };

  const progress = Math.round((currentQuestion / questions.length) * 100);

  return (
    <div>
      {!start ? (
        <>
          <div className="flex flex-col gap-[6px] [&_span]:font-semibold [&_span]:tracking-[0.96px] [&_span]:text-[#604d32] [&_span]:text-[1.2rem] md:gap-4 md:[&_span]:text-[2.3rem]">
            {/* <img src="./images/screen.png" alt="測驗背景" /> */}
           <br />
            <span>想知道適合你的貓咪性格是？</span>
            <span>讓我們來幫你測驗！</span>
            <div className="flex justify-center">
              <button
                className="animate-shake rounded-full bg-[#ffa45b] tracking-[1px] text-white hover:border-3 hover:border-[#ffa45b] hover:bg-[#fff6df] hover:text-[#ffa45b] h-10 w-10 text-[0.8rem] md:h-[100px] md:w-[100px] md:text-[1.2rem]"
                type="button"
                onClick={() => setStart(true)}
              >
                立即
                <br />
                測驗
                {/* <img src="./images/testbt.png" alt="測驗按鈕" /> */}
              </button>
            </div>
          </div>
        </>
      ) : currentQuestion < questions.length ? (
        <div className="relative flex flex-col gap-[3px] md:gap-[10px]">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-[1.1rem] text-[#5c4033] md:text-[2rem]">{questions[currentQuestion].question}</p>
          <div className="flex flex-col items-center justify-between h-full gap-[7px] md:h-[190px] md:gap-[17px]">
            {questions[currentQuestion].options.map((opt, idx) => (
              <button
                key={idx}
                className={`w-3/4 rounded-full border border-[#f9d176] text-[#5c4033] hover:bg-[#f9d176] hover:text-[#fff3e0] p-1 text-base md:p-0 md:text-[1.3rem] ${
                  selected === idx ? "bg-[#f9d176] text-[#fff3e0]" : "bg-[#fff3e0]"
                }`}
                onClick={() => setSelected(idx)}
              >
                {opt}
              </button>
            ))}
          </div>
          <button
            onClick={handleNext}
            disabled={selected === null}
            className="absolute rounded-full border border-[#f9d176] bg-[#fff3e0] p-0 text-[#5c4033] hover:bg-[#f9d176] hover:text-[#fff3e0] top-[41px] right-[-14px] h-10 w-10 text-xs md:top-auto md:right-[-20px] md:bottom-[50px] md:h-[74px] md:w-[74px] md:text-sm"
          >
            下一題
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[140px] gap-5 md:h-[277px] md:gap-[50px]">
          <p className="text-base text-[#5c4033] md:text-[2rem]">準備好看看適合你的主子了嗎？</p>
          <button
            onClick={handleSubmit}
            className="border-3 border-[#f9d176] bg-[#fff3e0] text-[#5c4033]"
          >查看結果</button>
        </div>
      )}
    </div>
  );
}

export default Test;
