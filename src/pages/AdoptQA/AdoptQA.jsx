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
          className={`mb-4 cursor-pointer rounded-2xl p-4 shadow-[0_0_6px_rgba(0,0,0,0.1)] transition-all duration-200 ease-in-out md:px-6 ${
            openIndex === index ? "bg-[#fff9f2]" : "bg-white"
          }`}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        >
          <div className="flex items-center justify-between text-justify text-base leading-normal font-normal tracking-[2.16px] text-[#604d32] md:text-[1.3rem] lg:text-[1.5rem]">
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

  const qaData = {
    before: [
      {
        q: "領養貓咪前需要準備哪些東西？",
        a: "建議先準備好貓砂盆、貓砂、飼料、食盆水盆、貓抓板和外出籠，並確認居家環境的門窗、陽台都有做好防護，避免貓咪意外走失或墜樓。",
      },
      {
        q: "我沒有養貓經驗，可以領養嗎？",
        a: "可以的！我們會透過問卷測驗了解你對貓咪習性的認識，並在領養後提供追蹤與諮詢協助，讓新手飼主也能安心上手。",
      },
      {
        q: "租屋族可以領養貓咪嗎？",
        a: "可以，但建議事先與房東溝通並確認租約中允許飼養寵物，家訪時也會一併確認居住環境是否適合貓咪長期生活。",
      },
      {
        q: "家裡已經有貓咪或其他寵物，還能再領養嗎？",
        a: "可以，但建議先評估家中既有貓咪或寵物的個性與健康狀況，並安排循序漸進的認識期，避免新成員讓大家感到緊迫。",
      },
      {
        q: "領養貓咪有年齡或身份的限制嗎？",
        a: "領養人需年滿20歲，並具備穩定的經濟能力與居住環境，實際規定會依各中途之家的要求略有不同，詳細內容可於申請時確認。",
      },
    ],
    apply: [
      {
        q: "領養貓咪的完整流程是什麼？",
        a: "流程共分三步驟：先完成問卷測驗、接著送出領養申請，最後安排家訪評估，通過後就可以把貓咪接回家囉！",
      },
      {
        q: "領養貓咪需要準備什麼?會需要費用嗎？",
        a: "我們不會跟您收取任何費用。您只需要準備好貓咪基本的生活用品、食物、水，並確認門窗防護做好安全，填寫好相關資料並送出申請就可以囉!",
      },
      {
        q: "問卷測驗不及格的話，還能夠領養貓咪嗎？",
        a: "測驗沒通過不代表無法領養，只是希望您能多花一點時間了解貓咪的習性，系統會請您等待一個月後再重新測驗一次。",
      },
      {
        q: "家訪評估會看什麼？",
        a: "家訪主要是確認居住環境是否安全，例如門窗防護、活動空間，並與您聊聊日後的飼養規劃，讓中途之家更放心把貓咪交給您。",
      },
      {
        q: "可以指定想領養的貓咪嗎？",
        a: "可以，您可以在協尋列表或貓咪介紹頁面挑選喜歡的貓咪，並在申請時填寫牠的資訊，我們會盡量協助媒合。",
      },
      {
        q: "送出申請後大概多久會收到回覆？",
        a: "通常會在收到申請後的3～5個工作天內與您聯繫並安排後續的家訪時間，若等待較久沒收到通知，歡迎主動與我們聯繫確認進度。",
      },
    ],
    after: [
      {
        q: "為什麼領養後還需要定期回報？",
        a: "追蹤機制是希望確保貓咪領養後能適應良好、被妥善照顧，也讓中途之家安心，並建立領養人與中途之家之間長期的信任關係。",
      },
      {
        q: "追蹤期是多久？需要每個月都回報嗎？",
        a: "追蹤期通常為期一年，需於每月底前上傳一次貓咪的生活照，完成當年度12個月的回報後即完成追蹤。",
      },
      {
        q: "每次需要上傳幾張照片？有什麼要求嗎？",
        a: "每次請上傳3張近期拍攝的生活照，並清楚拍到貓咪的正面，讓中途之家能確認貓咪目前的健康與生活狀況。",
      },
      {
        q: "上傳後多久會被確認？",
        a: "上傳後狀態會先顯示「已上傳」，中途之家確認貓咪狀況良好後，狀態就會更新為「已確認」，通常在數天內完成。",
      },
      {
        q: "忘記在月底前上傳怎麼辦？",
        a: "若不慎超過期限，請盡快補上傳並主動聯繫中途之家說明狀況，我們理解生活中偶有突發狀況，但仍希望能維持追蹤紀錄的完整性。",
      },
    ],
    other: [
      {
        q: "什麼是中途之家？",
        a: "中途之家是在貓咪找到永久家庭前，提供暫時照顧、醫療與陪伴的愛心飼主或機構，本平台協助串聯中途之家與領養人，讓資訊更透明。",
      },
      {
        q: "如果日後真的無法繼續飼養，該怎麼辦？",
        a: "請不要棄養，第一時間聯繫原本的中途之家說明狀況，一起討論後續安置的方式，我們會協助評估是否能轉由其他適合的家庭領養。",
      },
      {
        q: "貓咪走失了該怎麼辦？",
        a: "請立即聯繫原中途之家並提供最後出現的地點與時間，同時可在住家附近張貼協尋公告，也建議到平台的協尋列表刊登資訊。",
      },
      {
        q: "平台如何確保領養資訊的真實與透明？",
        a: "所有貓咪資訊皆由中途之家提供並定期更新，領養與追蹤紀錄也會保留在系統中，讓雙方的溝通與互動都有跡可循。",
      },
      {
        q: "使用平台或領養過程中遇到問題，可以聯絡誰？",
        a: "歡迎透過網站上的聯絡方式與我們聯繫，我們會盡快協助處理您的問題，或是為您轉介給相關的中途之家。",
      },
    ],
  };

  return (
    <>
      <section className="flex flex-col py-[100px] px-[2%] md:px-[5%] lg:px-[7%]">
        <Maintitle en="Q&A" cn="常見問題" />
        <div className="relative flex flex-col mt-0 md:mt-[50px] lg:flex-row">
           <div
             className="flex flex-col items-center rounded-3xl transition-[top] duration-300 ease-in-out static bg-transparent p-0 shadow-none md:absolute md:right-0 md:bg-[rgba(255,236,183,0.5)] md:py-6 md:shadow-[0_4px_10px_rgba(0,0,0,0.1)]"
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

          <div className="w-full md:w-[min(70%,800px)]">
            {sections.map((sec) => (
              <QASection
                key={sec.id}
                id={sec.id}
                title={sec.title}
                qas={qaData[sec.id]}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
export default AdoptQA;
