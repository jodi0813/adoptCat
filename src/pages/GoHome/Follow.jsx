import { useState } from "react";
import {
  gohomeSectionClass,
  gohomeLeftEarClass,
  gohomeRightEarClass,
  gohomeBoxClass,
} from "./gohomeShellClasses";

function Follow() {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [uploadedMonths, setUploadedMonths] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [previews, setPreviews] = useState([]);

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
    setShowModal(true);
    setPreviews([]);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const handleUpload = () => {
    if (selectedMonth && !uploadedMonths.includes(selectedMonth)) {
      setUploadedMonths([...uploadedMonths, selectedMonth]);
    }
    setShowModal(false);
  };

  const renderMonthButton = (month) => {
    const isUploaded = uploadedMonths.includes(month);
    return (
      <button
        key={month}
        className={`flex aspect-square w-[35%] items-center justify-center rounded-full text-center text-[1.2rem] leading-normal font-bold tracking-[3.2px] text-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] max-[767px]:w-[100px] ${
          isUploaded ? "bg-[#9ecbff]" : "bg-[#d9d9d9]"
        }`}
        onClick={() => handleMonthClick(month)}
      >
        {month}月
      </button>
    );
  };

  return (
    <>
      <section id="follow" className={gohomeSectionClass}>
        {/* 左耳 */}
        <div className={gohomeLeftEarClass}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="271"
            height="210"
            viewBox="0 0 271 210"
            fill="none"
          >
            <path
              d="M144.506 0.804903C200.79 1.01477 237.927 145.728 268.127 184.104C298.326 222.48 16.5937 214.301 1.65421 184.104C-13.2853 153.907 88.2215 0.595039 144.506 0.804903Z"
              fill="#fff"
            />
          </svg>
        </div>

        {/* 右耳 */}
        <div className={gohomeRightEarClass}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="271"
            height="209"
            viewBox="0 0 271 209"
            fill="none"
          >
            <path
              d="M136.287 0.805664C193.733 16.44 283.046 154.203 268.97 182.658C254.028 212.855 -27.7009 221.034 2.49843 182.658C24.868 154.232 51.045 67.4618 85.9896 24.293L130.526 43.4375L136.287 0.805664Z"
              fill="#fff"
            />
          </svg>
        </div>
        <div className={`${gohomeBoxClass} flex-col! gap-5 p-[5%]`}>
          <header className="flex items-center justify-center max-[767px]:flex-col max-[767px]:gap-[15px]">
            <div className="flex-1">
              <span className="inline-flex h-[40%] w-[140px] items-center justify-center rounded-[5px] border border-[#604d32] px-[8.5px] py-[10.5px] text-base leading-normal font-medium text-[#604d32]">目前貓咪：搗灰</span>
            </div>
            <div className="flex flex-[2] flex-col">
              <span className="text-center text-[2rem] leading-normal font-bold tracking-[3.2px] text-[#604d32]">每月領養追蹤</span>
              <span className="text-center text-[1.5rem] leading-normal font-bold tracking-[2.4px] text-[#604d32] max-[767px]:text-[1.2rem]">
                (請於每月底前完成上傳貓咪生活照)
              </span>
            </div>
            <div className="flex flex-1 gap-[3%]">
              <div className="flex aspect-square min-w-[50px] w-1/4 items-center justify-center rounded-full text-white bg-[#d9d9d9]">未上傳</div>
              <div className="flex aspect-square min-w-[50px] w-1/4 items-center justify-center rounded-full text-white bg-[#9ecbff]">已上傳</div>
              <div className="flex aspect-square min-w-[50px] w-1/4 items-center justify-center rounded-full text-white bg-[#ffc37d]">已確認</div>
            </div>
          </header>

          <div className="flex text-center text-[1.2rem] leading-normal font-bold tracking-[2px] text-[#604d32]">當年度：114年</div>

          <div className="flex flex-col gap-5 max-[767px]:flex-row max-[767px]:justify-center">
            <div className="flex justify-center gap-[3%] max-[767px]:flex-col max-[767px]:gap-[10px]">
              {[1, 2, 3, 4, 5, 6].map(renderMonthButton)}
            </div>
            <div className="flex justify-center gap-[3%] max-[767px]:flex-col max-[767px]:gap-[10px]">
              {[7, 8, 9, 10, 11, 12].map(renderMonthButton)}
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <>
          <div className="fixed top-0 left-0 z-[998] h-screen w-screen bg-black/50"></div>
          <div className="fixed top-1/2 left-1/2 z-[999] w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
            <button
              className="absolute top-0 right-0 z-[1001] cursor-pointer border-none bg-transparent text-[2rem] text-[#888] hover:text-[#333]"
              onClick={() => setShowModal(false)}
            >×</button>
            <div className="flex flex-col items-center gap-3">
              <p className="mb-3 text-center font-['Huninn'] text-[1.2rem] leading-normal font-bold tracking-[2.4px] text-[#604d32]">
                請上傳 {selectedMonth} 月的生活照片 3 張<br />（須清楚拍攝貓咪正面）
              </p>
              <div className="flex w-full gap-3">
                <label className="relative flex h-[300px] w-full shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[10px] border border-[#ff630f] bg-[#fff7ef] p-0 text-center text-base font-bold">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  {previews.length === 0 ? (
                    <span className="w-full p-2 text-center text-[1.5rem] text-[#ff630f]">請一次點選三張照片上傳</span>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center gap-[2px]">
                      {previews.map((src, idx) => (
                        <img
                          key={idx}
                          src={src}
                          alt={`預覽圖${idx}`}
                          className="h-4/5 w-2/5 rounded-[5px] border border-[#ccc] object-cover"
                        />
                      ))}
                    </div>
                  )}
                </label>
              </div>
              <button
                onClick={handleUpload}
                className="flex h-[50px] w-[142px] shrink-0 items-center justify-center rounded-full bg-[#ffc37d] px-[21.708px] py-[13px] text-base text-white hover:bg-[#d99a00]"
              >
                上傳
              </button>
            </div>
          </div>    </>
      )}
    </>
  );
}

export default Follow;
