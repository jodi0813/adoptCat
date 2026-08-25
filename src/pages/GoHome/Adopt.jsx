import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  gohomeSectionClass,
  gohomeLeftEarClass,
  gohomeRightEarClass,
  gohomeBoxClass,
} from "./gohomeShellClasses";

const badgeColorClass = {
  gray: "bg-[#d9d9d9]",
  yellow: "bg-[#ffeda6]",
  darkgray: "bg-[#888] text-white",
};

function Adopt() {
    const [quizStatus, setQuizStatus] = useState("notyet"); // notyet, passed, failed

    useEffect(() => {
        const status = localStorage.getItem("catQuizPassed");
        if (status === "true") setQuizStatus("passed");
        else if (status === "false") setQuizStatus("failed");
        else setQuizStatus("notyet");
    }, []);
    // useEffect(() => {
    //     localStorage.removeItem("catQuizPassed"); // 重新整理就清除
    //     setQuizStatus("notyet");
    // }, []);
    let badgeClass = "gray";
    let desc = "尚未測驗";
    if (quizStatus === "passed") {
        badgeClass = "yellow";
        desc = "問卷已通過 ✅";
    } else if (quizStatus === "failed") {
        badgeClass = "darkgray";
        desc = "請做好準備，過一個月後再測驗";
    }

    return (
        <>
            <section id="adopt" className={gohomeSectionClass}>
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
                <div className={`${gohomeBoxClass} flex-col! gap-[20%] p-[5%]`}>
                    <header className="flex justify-center">
                        <span className="text-center text-[2rem] leading-normal font-bold tracking-[3.2px] text-[#604d32]">申請領養貓咪</span>
                    </header>
                    <div className="flex h-[70%] justify-center gap-[8%] max-[768px]:h-auto max-[768px]:flex-col max-[768px]:gap-[30px]">

                        <div className="flex h-full w-full flex-col justify-between rounded-[30px] border border-[#ffa50050] bg-white p-[2%] text-center shadow-[0_2px_6px_rgba(0,0,0,0.05)] max-[768px]:p-[5%]">
                            {quizStatus === "failed" ? (
                                <div className={`flex flex-col items-center justify-center gap-[10px] rounded-full p-[8%] font-bold shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] [&_.number]:flex [&_.number]:h-[60px] [&_.number]:w-[60px] [&_.number]:items-center [&_.number]:justify-center [&_.number]:rounded-full [&_.number]:bg-[#fffdf0] [&_span]:text-center [&_span]:text-[2rem] [&_span]:leading-normal [&_span]:font-bold [&_span]:tracking-[3.2px] [&_span]:text-[#604d32] ${badgeColorClass[badgeClass]}`}>
                                    <div className="number">1</div>
                                    <span>填寫問卷測驗</span>
                                </div>
                            ) : (
                                <Link to="/gohome/adopt/catquiz">
                                    <div className={`flex flex-col items-center justify-center gap-[10px] rounded-full p-[8%] font-bold shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] [&_.number]:flex [&_.number]:h-[60px] [&_.number]:w-[60px] [&_.number]:items-center [&_.number]:justify-center [&_.number]:rounded-full [&_.number]:bg-[#fffdf0] [&_span]:text-center [&_span]:text-[2rem] [&_span]:leading-normal [&_span]:font-bold [&_span]:tracking-[3.2px] [&_span]:text-[#604d32] ${badgeColorClass[badgeClass]}`}>
                                        <div className="number">1</div>
                                        <span>填寫問卷測驗</span>
                                    </div>
                                </Link>
                            )}
                            <div>
                                <div className="text-center text-[1.2rem] leading-normal tracking-[2px] text-[#ff630f]">處理進度</div>
                                <div className="rounded-[6px] bg-[#fff4da] p-2 text-center font-['Huninn'] text-[1.2rem] leading-normal font-bold tracking-[2.4px] text-[#604d32]">{desc}</div>
                            </div>
                        </div>

                        <div className="flex h-full w-full flex-col justify-between rounded-[30px] border border-[#ffa50050] bg-white p-[2%] text-center shadow-[0_2px_6px_rgba(0,0,0,0.05)] max-[768px]:p-[5%]">
                            <Link to="#">
                                <div className="flex flex-col items-center justify-center gap-[10px] rounded-full bg-[#d9d9d9] p-[8%] font-bold shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] [&_.number]:flex [&_.number]:h-[60px] [&_.number]:w-[60px] [&_.number]:items-center [&_.number]:justify-center [&_.number]:rounded-full [&_.number]:bg-[#fffdf0] [&_span]:text-center [&_span]:text-[2rem] [&_span]:leading-normal [&_span]:font-bold [&_span]:tracking-[3.2px] [&_span]:text-[#604d32]">
                                    <div className="number">2</div>
                                    <span>申請領養貓咪</span>
                                </div>
                            </Link>
                            <div>
                                <div className="text-center text-[1.2rem] leading-normal tracking-[2px] text-[#ff630f]">處理進度</div>
                                <div className="rounded-[6px] bg-[#fff4da] p-2 text-center font-['Huninn'] text-[1.2rem] leading-normal font-bold tracking-[2.4px] text-[#604d32]">請先完成測驗</div></div>
                        </div>

                        <div className="flex h-full w-full flex-col justify-between rounded-[30px] border border-[#ffa50050] bg-white p-[2%] text-center shadow-[0_2px_6px_rgba(0,0,0,0.05)] max-[768px]:p-[5%]">
                            <Link to="#">
                                <div className="flex flex-col items-center justify-center gap-[10px] rounded-full bg-[#d9d9d9] p-[8%] font-bold shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] [&_.number]:flex [&_.number]:h-[60px] [&_.number]:w-[60px] [&_.number]:items-center [&_.number]:justify-center [&_.number]:rounded-full [&_.number]:bg-[#fffdf0] [&_span]:text-center [&_span]:text-[2rem] [&_span]:leading-normal [&_span]:font-bold [&_span]:tracking-[3.2px] [&_span]:text-[#604d32]">
                                    <div className="number">3</div>
                                    <span>家訪評估</span>
                                </div>
                            </Link>
                            <div>
                                <div className="text-center text-[1.2rem] leading-normal tracking-[2px] text-[#ff630f]">處理進度</div>
                                <div className="rounded-[6px] bg-[#fff4da] p-2 text-center font-['Huninn'] text-[1.2rem] leading-normal font-bold tracking-[2.4px] text-[#604d32]">已預約4/26上午10:00</div></div>
                        </div> </div>
                </div>
            </section>
        </>
    )
} export default Adopt;