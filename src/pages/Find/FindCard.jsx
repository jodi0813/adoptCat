function FindCard({
  find_pic,
  find_name,
  find_sex,
  find_color,
  find_feature,
  find_time,
  find_location,
  find_owner_name,
  find_phone,
}) {
  return (
    <>
      <div className="w-full max-w-[300px] overflow-hidden rounded-[25px] bg-white">
        <img
          className="h-[286px] w-full"
          src={find_pic}
          alt="貓咪照片"
          onError={(e) => {
            e.currentTarget.src = "./images/lost_cat1.png";
          }}
        />
        <div className="p-[5%]">
          <ul>
            <li className="text-left text-[1.1rem] leading-[27px]">
              <span className="font-bold">寵物名字：</span>
              <span className="font-medium">{find_name}</span>
            </li>
            <li className="text-left text-[1.1rem] leading-[27px]">
              <span className="font-bold">寵物性別：</span>
              <span className="font-medium">{find_sex}</span>
            </li>
            <li className="text-left text-[1.1rem] leading-[27px]">
              <span className="font-bold">寵物毛色：</span>
              <span className="font-medium">{find_color}</span>
            </li>
            <li className="text-left text-[1.1rem] leading-[27px]">
              <span className="font-bold">寵物特徵：</span>
              <span className="font-medium">{find_feature}</span>
            </li>
            <li className="text-left text-[1.1rem] leading-[27px]">
              <span className="font-bold">遺失時間：</span>
              <span className="font-medium">{find_time}</span>
            </li>
            <li className="text-left text-[1.1rem] leading-[27px]">
              <span className="font-bold">遺失地點：</span>
              <span className="font-medium">{find_location}</span>
            </li>
            <li className="text-left text-[1.1rem] leading-[27px]">
              <span className="font-bold">飼主姓名：</span>
              <span className="font-medium">{find_owner_name}</span>
            </li>
            <li className="text-left text-[1.1rem] leading-[27px]">
              <span className="font-bold">連絡電話：</span>
              <span className="font-medium">{find_phone}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default FindCard;
