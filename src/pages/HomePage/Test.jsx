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
          <div className="flex flex-col gap-4 max-[767px]:gap-[6px] [&_span]:text-[2.3rem] [&_span]:font-semibold [&_span]:tracking-[0.96px] [&_span]:text-[#604d32] max-[767px]:[&_span]:text-[1.2rem]">
            {/* <img src="./images/screen.png" alt="測驗背景" /> */}
           <br />
            <span>想知道適合你的貓咪性格是？</span>
            <span>讓我們來幫你測驗！</span>
            <div className="flex justify-center">
              <button
                className="h-[100px] w-[100px] animate-shake rounded-full bg-[#ffa45b] text-[1.2rem] tracking-[1px] text-white hover:border-3 hover:border-[#ffa45b] hover:bg-[#fff6df] hover:text-[#ffa45b] max-[767px]:h-10 max-[767px]:w-10 max-[767px]:p-0 max-[767px]:text-[0.8rem]"
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
        <div className="relative flex flex-col gap-[10px] max-[767px]:gap-[3px]">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-[2rem] text-[#5c4033] max-[767px]:text-[1.1rem]">{questions[currentQuestion].question}</p>
          <div className="flex h-[190px] flex-col items-center justify-between gap-[17px] max-[767px]:h-full max-[767px]:gap-[7px]">
            {questions[currentQuestion].options.map((opt, idx) => (
              <button
                key={idx}
                className={`w-3/4 rounded-full border border-[#f9d176] text-[1.3rem] text-[#5c4033] hover:bg-[#f9d176] hover:text-[#fff3e0] max-[767px]:p-1 max-[767px]:text-base ${
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
            className="absolute right-[-20px] bottom-[50px] h-[74px] w-[74px] rounded-full border border-[#f9d176] bg-[#fff3e0] p-0 text-sm text-[#5c4033] hover:bg-[#f9d176] hover:text-[#fff3e0] max-[767px]:top-[41px] max-[767px]:right-[-14px] max-[767px]:h-10 max-[767px]:w-10 max-[767px]:text-xs"
          >
            下一題
          </button>
        </div>
      ) : (
        <div className="flex h-[277px] flex-col items-center justify-center gap-[50px] max-[767px]:h-[140px] max-[767px]:gap-5">
          <p className="text-[2rem] text-[#5c4033] max-[767px]:text-base">準備好看看適合你的主子了嗎？</p>
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
