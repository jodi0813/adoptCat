import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Test.scss";

function Test() {
  const navigate = useNavigate();

  const questions = [
    {
      question: "你想要領養什麼樣個性的主子？",
      options: [
        "很親人常常對我撒嬌",
        "靜靜在旁邊陪伴，但不要過多打擾",
        "習慣及性格穩定比較重要",
      ],
      scores: ["黏人", "獨立", "穩定"],
      type: "hashtag",
    },
    {
      question: "家中是否有其他貓咪?",
      options: [
        "否",
        "是",
        "目前沒有，未來有打算養第二隻貓",
      ],
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
        "我願意給老貓一個晚年安心的家",
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
    <div className="quiz-container">
      {!start ? (
        <>
          <div>
            <img src="./images/screen.png" alt="測驗背景" />
          </div>
          <button className="testBt" onClick={() => setStart(true)}>
            <img src="./images/testbt.png" alt="" />
          </button>
        </>
      ) : currentQuestion < questions.length ? (
        <div className="quiz-question">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <p>{questions[currentQuestion].question}</p>
          <div className="quiz-options">
            {questions[currentQuestion].options.map((opt, idx) => (
              <button
                key={idx}
                className={selected === idx ? "selectedAns" : ""}
                onClick={() => setSelected(idx)}
              >
                {opt}
              </button>
            ))}
          </div>
          <button onClick={handleNext} disabled={selected === null} className="next-question">
            下一題
          </button>
        </div>
      ) : (
        <div className="quiz-result">
          <p>準備好看看適合你的主子了嗎？</p>
          <button onClick={handleSubmit}>查看結果</button>
        </div>
      )}
    </div>
  );
}

export default Test;
