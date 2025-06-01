import { useState, useEffect, useRef } from "react";
import "./AdoptQA.scss";
import Maintitle from "../../components/title/Maintitle";
import CatNameTagAuto from "../../components/tag/CatNameTagAuto";

const sections = [
  { id: "before", title: "領養貓咪前" },
  { id: "apply", title: "申請領養貓咪" },
  { id: "after", title: "領養後追蹤機制" },
  { id: "other", title: "其他問題" },
];

const QASection = ({ id, title, qas }) => {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section id={id} className="qa-section">
      {/* <h2 className="qa-title">{title}</h2> */}
      <div><CatNameTagAuto name={title}/></div>
      {qas.map((qa, index) => (
        <div
          key={index}
          className={`qa-item ${openIndex === index ? "open" : ""}`}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        >
          <div className="question">
            <span>{qa.q}</span>
            <img src="/images/catpaworange.svg" alt="paw" className="paw" />
          </div>
          {openIndex === index && <div className="answer">{qa.a}</div>}
        </div>
      ))}
    </section>
  );
};

function AdoptQA() {
  const navRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.style.top = `${window.scrollY + 100}px`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  const sampleQAs = [
    {
      q: "領養貓咪需要準備什麼?會需要費用嗎？",
      a: "您只需要準備好貓咪基本的生活用品、食物、水，並確認門窗防護錯安全，填寫好相關資料並送出申請就可以囉!",
    },
    {
      q: "問卷測驗不及格的話，還能夠領養貓咪嗎？",
      a: "會進一步評估是否適合領養。",
    },
    {
      q: "問卷測驗不及格的話，還能夠領養貓咪嗎？",
      a: "會進一步評估是否適合領養。",
    },
  ];

  return (
    <>
      <section className="qa">
        <Maintitle en="Q&A" cn="常見問題" />
        <div className="qa-container">
          <div className="qa-content">
            {sections.map((sec) => (
              <QASection
                key={sec.id}
                id={sec.id}
                title={sec.title}
                qas={sampleQAs}
              />
            ))}
          </div>
          <div className="qa-nav" ref={navRef}>
            {sections.map((sec) => (
              <div
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className="qa-nav-item"
              >
                {sec.title}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
export default AdoptQA;
