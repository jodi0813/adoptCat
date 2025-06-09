// CatQuiz.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CatQuiz.scss";

const questions = [
  {
    question: "貓咪剛到新家時，最好的做法是？",
    options: [
      "馬上帶牠見很多人",
      "讓牠自由探索整個家",
      "準備一個安靜的小空間讓牠慢慢適應",
      "把牠關在籠子裡一整天"
    ],
    answer: 2,
  },
  {
    question: "當貓咪害怕躲起來時，應該怎麼做？",
    options: [
      "把牠抓出來",
      "在躲藏的地方放上食物和水，讓牠自己慢慢出來",
      "大聲叫牠出來",
      "用水噴牠牠牠出來"
    ],
    answer: 1,
  },
  {
    question: "以下哪個是貓咪日常需要的？",
    options: [
      "常洗澡",
      "每天戴項圈",
      "乾淨的飲水",
      "穿衣服"
    ],
    answer: 2,
  },
  {
    question: "貓咪可以自由生育嗎？",
    options: [
      "可以，生很多很可愛",
      "不行，應該結紮避免發情行為",
      "要看貓咪意願",
      "只要一胎就好"
    ],
    answer: 1,
  },
  {
    question: "貓咪需要定期驅蟲嗎？",
    options: [
      "不需要",
      "只要出門過才要",
      "需要，室內貓也要定期驅蟲",
      "看心情"
    ],
    answer: 2,
  },
  {
    question: "貓咪一天大約需要睡多久？",
    options: [
      "4-6 小時",
      "8-10 小時",
      "12-16 小時",
      "18-20 小時"
    ],
    answer: 2,
  },
  {
    question: "以下哪一種是貓咪開心的表現？",
    options: [
      "尾巴大力搖擺",
      "瞳孔擴大、耳朵向後",
      "用身體蹭你並發出呼嚕聲",
      "躲起來不見人"
    ],
    answer: 2,
  },
  {
    question: "當貓咪亂抓沙發時，應該怎麼辦？",
    options: [
      "打牠教訓",
      "提供抓板並引導牠使用",
      "給牠穿手套",
      "剪掉牠所有指甲"
    ],
    answer:1,
  },
  {
    question: "貓咪的食物中哪個比較健康？",
    options: [
      "巧克力",
      "人類食物",
      "高品質的貓糧",
      "冰淇淋"
    ],
    answer: 2,
  },
  {
    question: "哪一種貓咪行為代表牠信任你？",
    options: [
      "翻肚子露出肚皮",
      "躲起來不動",
      "哈氣",
      "用爪子拍你"
    ],
    answer: 0,
  },
];

export default function CatQuiz() {
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [finalScore, setFinalScore] = useState(null);

  const handleOptionClick = (qIndex, optIndex) => {
    const updated = [...answers];
    updated[qIndex] = optIndex;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    const score = answers.reduce((total, ans, idx) => ans === questions[idx].answer ? total + 10 : total, 0);
    setFinalScore(score);
    setShowResult(true);
    if (score >= 80) {
      localStorage.setItem("catQuizPassed", "true");
    } else {
      localStorage.setItem("catQuizPassed", "false");
    }
  };

  const resetQuiz = () => {
    setAnswers(Array(questions.length).fill(null));
    setPage(0);
    setShowResult(false);
    setFinalScore(null);
  };

  const startIndex = page * 5;
  const currentQuestions = questions.slice(startIndex, startIndex + 5);
 const navigate = useNavigate();
  return (
    <div className="cat-quiz-container">
      <h2>領養貓咪問卷測驗</h2>
      {!showResult ? (
        <>
          {currentQuestions.map((q, i) => {
            const qIndex = startIndex + i;
            return (
              <div key={qIndex} className="question-block">
                <p>{qIndex + 1}. {q.question}</p>
                <ul>
                  {q.options.map((opt, j) => (
                    <li
                      key={j}
                      className={answers[qIndex] === j ? "selected" : ""}
                      onClick={() => handleOptionClick(qIndex, j)}
                    >
                      {String.fromCharCode(65 + j)}. {opt}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <div className="quiz-nav">
            {page > 0 && <button onClick={() => setPage(page - 1)}>上一頁</button>}
            {startIndex + 5 < questions.length ? (
              <button
                onClick={() => {
                  setPage(page + 1);
                  window.scrollTo(0, 0); // 捲動到頂部
                }}
              >
                下一頁
              </button>
            ) : (
              <button onClick={handleSubmit}>送出問卷</button>
            )}
          </div>
        </>
      ) : (
        <div className="result-popup">
          <h3>~結果~</h3>
          <p className={finalScore >= 80 ? "pass" : "fail"}>
            {finalScore >= 80 ? "恭喜通過" : "未通過"}
          </p>
          <p>您的測驗成績為 <span>{finalScore}</span> 分！</p>
          <p>{finalScore >= 80 ? "恭喜你可以繼續填寫領養申請囉！" : "請做好充足的準備後，等過一個月後再來測驗喔！"}</p>
          <button onClick={() => navigate("/gohome/adopt")}>{finalScore >= 80 ? "前往下一步" : "回到領養頁面"}</button>
        </div>
      )}
    </div>
  );
}
