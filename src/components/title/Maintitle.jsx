import "./Maintitle.scss";
function Maintitle({ en, cn }) {
  return (
    <>
      <div className="mainTitle">
        <span className="maintitle-En">{en}</span>
        <span className="maintitle-Cn">
          <img src="./images/catpawbrown.svg" alt="標題裝飾" />
          <h1>{cn}</h1>
          <img src="./images/catpawbrown.svg" alt="標題裝飾" />
        </span>
      </div>
    </>
  );
}
export default Maintitle;
