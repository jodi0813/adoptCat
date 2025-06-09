import "./Footer.scss";
function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer-ears">
          {/* 左耳 */}
          <div className="left-ear">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="271"
              height="210"
              viewBox="0 0 271 210"
              fill="none"
            >
              <path
                d="M144.506 0.804903C200.79 1.01477 237.927 145.728 268.127 184.104C298.326 222.48 16.5937 214.301 1.65421 184.104C-13.2853 153.907 88.2215 0.595039 144.506 0.804903Z"
                fill="#E2D9A8"
              />
            </svg>
          </div>

          {/* 右耳 */}
          <div className="right-ear">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="271"
              height="209"
              viewBox="0 0 271 209"
              fill="none"
            >
              <path
                d="M136.287 0.805664C193.733 16.44 283.046 154.203 268.97 182.658C254.028 212.855 -27.7009 221.034 2.49843 182.658C24.868 154.232 51.045 67.4618 85.9896 24.293L130.526 43.4375L136.287 0.805664Z"
                fill="#E2D9A8"
              />
            </svg>
          </div>
        </div>
        <div className="footer-content">
          <img src="./images//logo_navbar.png" alt="網站LOGO" />
          <div className="footer-content1">
            <ul>
              <li>關於我們</li>
              <li>領養流程</li>
              <li>帶我回家</li>
              <li>常見問題</li>
            </ul>
            <span>電話：(02)2533-6666</span>
            <span>地址：台北市中正區領貓路一段66號</span>
            <span>© Cospanyright 2024. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </>
  );
}
export default Footer;
