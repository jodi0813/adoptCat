import { useState, useEffect, useRef } from "react";
import Maintitle from "../../components/title/Maintitle";
import CatNameTagAuto from "../../components/tag/CatNameTagAuto";
import CatNameTagHover from "../../components/tag/CatNameTagHover";

const sections = [
  { id: "before", title: "領養貓咪前" },
  { id: "apply", title: "領養貓咪" },
  { id: "after", title: "領養後追蹤" },
  { id: "other", title: "其他問題" },
];

const QASection = ({ id, title, qas }) => {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section id={id}>
      {/* <h2 className="qa-title">{title}</h2> */}
      <div className="flex h-[130px] items-center justify-center"><CatNameTagAuto name={title} catColor="#CAB271"/></div>
      {qas.map((qa, index) => (
        <div
          key={index}
          className={`mb-4 cursor-pointer rounded-2xl p-4 px-6 shadow-[0_0_6px_rgba(0,0,0,0.1)] transition-all duration-200 ease-in-out max-[767px]:p-4 ${
            openIndex === index ? "bg-[#fff9f2]" : "bg-white"
          }`}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        >
          <div className="flex items-center justify-between text-justify text-[1.5rem] leading-normal font-normal tracking-[2.16px] text-[#604d32] max-[1024px]:text-[1.3rem] max-[767px]:text-base">
            <span>{qa.q}</span>
            <img src="./images/catpaworange.svg" alt="paw" className="w-[60px]" />
          </div>
          {openIndex === index && (
            <div className="mt-3 flex justify-start text-justify text-base leading-normal font-normal tracking-[1.44px] text-[#604d32]">
              {qa.a}
            </div>
          )}
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
      a: "我們不會跟您收取任何費用。您只需要準備好貓咪基本的生活用品、食物、水，並確認門窗防護錯安全，填寫好相關資料並送出申請就可以囉!",
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
      <section className="flex flex-col px-[7%] py-[100px] max-[1024px]:px-[5%] max-[767px]:px-[2%]">
        <Maintitle en="Q&A" cn="常見問題" />
        <div className="relative mt-[50px] flex max-[1024px]:flex-col max-[767px]:mt-0">
           <div
             className="absolute right-0 flex flex-col items-center rounded-3xl bg-[rgba(255,236,183,0.5)] py-6 shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition-[top] duration-300 ease-in-out max-[767px]:static max-[767px]:flex-col max-[767px]:bg-transparent max-[767px]:p-0 max-[767px]:shadow-none"
             ref={navRef}
           >
            {sections.map((sec) => (
              <div
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className="flex w-full flex-1 cursor-pointer justify-center bg-transparent"
              >
                <CatNameTagHover name={sec.title} catColor="#FFF" textColor="#FF630F"/>
              </div>
            ))}
          </div>

          <div className="w-[70%] max-w-[800px] max-[767px]:w-full">
            {sections.map((sec) => (
              <QASection
                key={sec.id}
                id={sec.id}
                title={sec.title}
                qas={sampleQAs}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
export default AdoptQA;
