import "./Maintitle.scss";
function Maintitle({ en, cn }) {
  return (
    <>
      <div className="mainTitle">
        <span className="maintitle-En">{en}</span>
        <span className="maintitle-Cn">
          <img src="./images/catpawbrown.svg" alt="標題裝飾" />
          {cn}
          <img src="./images/catpawbrown.svg" alt="標題裝飾" />
        </span>
      </div>
    </>
  );
}
export default Maintitle;
