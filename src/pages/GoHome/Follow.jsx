import "./GoHome.scss";
import "./Follow.scss";
function Follow() {
  return (
    <>
      <section id="follow">
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
        <div className="gohomeBox followBox">
          <header className="followHeader">
            <div className="followCatName">
              <span>目前貓咪：搗灰</span>
            </div>
            <div className="followTitle">
              <span className="followTitle1">每月領養追蹤</span>
              <span className="followTitle2">(請於每月底前完成上傳貓咪生活照)</span>
            </div>
            <div className="followCircles">
              <div className="circle gray">未上傳</div>
              <div className="circle blue">已上傳</div>
              <div className="circle orange">已確認</div>
            </div>
          </header>
          <div className="followYear">當年度：114年</div>
          <div className="monthCirleBox">
            <div className="monthCircleLine">
              <button className="monthCircle">1月</button>
              <button className="monthCircle">2月</button>
              <button className="monthCircle">3月</button>
              <button className="monthCircle">4月</button>
              <button className="monthCircle">5月</button>
              <button className="monthCircle">6月</button>
            </div>
            <div className="monthCircleLine">
              <button className="monthCircle">7月</button>
              <button className="monthCircle">8月</button>
              <button className="monthCircle">9月</button>
              <button className="monthCircle">10月</button>
              <button className="monthCircle">11月</button>
              <button className="monthCircle">12月</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Follow;
