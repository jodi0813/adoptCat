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
            <div>
              <span>目前貓咪：搗灰</span>
            </div>
            <div>
              <span>每月領養追蹤</span>
              <span>(請於每月底前完成上傳貓咪生活照)</span>
            </div>
            <div>
              <div>未上傳</div>
              <div>已上傳</div>
              <div>已確認</div>
            </div>
          </header>
          <div>當年度：114年</div>
          <div>
            <div>
              <button>1月</button>
              <button>2月</button>
              <button>3月</button>
              <button>4月</button>
              <button>5月</button>
              <button>6月</button>
            </div>
            <div>
              <button>7月</button>
              <button>8月</button>
              <button>9月</button>
              <button>10月</button>
              <button>11月</button>
              <button>12月</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Follow;
