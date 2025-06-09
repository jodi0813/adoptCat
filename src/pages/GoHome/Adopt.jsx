import "./Adopt.scss";

function Adopt() {
    return (
        <>
            <section id="adopt">
                {/* 左耳 */}
                <div className="gohomeLeftEar">
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
                <div className="gohomeRightEar">
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
                <div className="gohomeBox adoptBox">
                    <header className="adoptHeader">
                        <span className="adoptTitle"> 申請領養貓咪</span>
                    </header>
                    <div className="step-section">
                        <div className="step-card">
                            <div className="step-badge yellow">
                                <div className="number">1</div>
                                <span>填寫問卷測驗</span>
                            </div>
                            <div>
                                <div className="step-status-title">處理進度</div>
                                <div className="step-description">問卷已通過 ✅</div></div>
                        </div>

                        <div className="step-card">
                            <div className="step-badge yellow">
                                <div className="number">2</div>
                                <span>申請領養貓咪</span>
                            </div>
                            <div>
                                <div className="step-status-title">處理進度</div>
                                <div className="step-description">已送出申請，等待審核中</div></div>
                        </div>

                        <div className="step-card">
                            <div className="step-badge gray">
                                <div className="number">3</div>
                                <span>家訪評估</span>
                            </div>
                            <div>
                                <div className="step-status-title">處理進度</div>
                                <div className="step-description">已預約4/26上午10:00</div></div>
                        </div> </div>
                </div>
            </section>
        </>
    )
} export default Adopt;