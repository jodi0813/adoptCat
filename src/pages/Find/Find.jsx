import Maintitle from "../../components/title/Maintitle";
import FindCard from "./FindCard";
import "./Find.scss";
import useFindApi from "../../utils/api";

function Find() {
  const { findList, loading, error } = useFindApi();
  if (loading) return <p>載入中請稍等...</p>;
  
  if (error) return <p>發生錯誤：{String(error.message)}</p>;

  const findCats=findList
  .filter((row) => row["寵物別"] === "貓")
  .sort((a, b) => new Date(b["遺失時間"]) - new Date(a["遺失時間"]));

  return (
    <>
      <section id="findPet">
        <Maintitle cn="遺失協尋" en="Help Find Me"/>
        <div className="findBox">
        {findCats.slice(0,20).map((item, idx) => (           
          <FindCard
            key={item["晶片號碼"] ?? idx}
            find_pic={item["PICTURE"] || "./images/lost_cat1.png"}
            find_name={item["寵物名"] || ""}
            find_sex={item["性別"] || ""}
            find_color={item["毛色"] || ""}
            find_feature={item["特徵"] || ""}
            find_time={item["遺失時間"] || ""}
            find_location={item["遺失地點"] || ""}
            find_owner_name={item["飼主姓名"] || ""}
            find_phone={item["連絡電話"] || ""}
          />
        ))}
        </div>
      </section>
    </>
  );
}
export default Find;
