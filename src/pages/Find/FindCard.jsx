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
  find_chip_id,
}) {
  const title = find_name || "走失的貓咪";

  return (
    <div className="flex w-full max-w-[320px] flex-col overflow-hidden rounded-[25px] bg-white shadow-[0_0_6px_rgba(0,0,0,0.1)]">
      <img
        className="h-[220px] w-full object-cover"
        src={find_pic}
        alt={title}
        onError={(e) => {
          e.currentTarget.src = "./images/lost_cat1.png";
        }}
      />

      <div className="flex flex-col gap-2 p-[5%]">
        <div className="flex justify-between items-center gap-1">
          <h3 className="text-left text-[1.2rem] leading-normal font-bold text-[#604d32]">
            {title}
          </h3>
          {find_chip_id && (
            <p className="text-left text-xs text-[#604d32]/60">晶片號碼：{find_chip_id}</p>
          )}
        </div>

        <ul>
          <li className="text-left text-base leading-[27px]">
            <span className="font-bold text-[#604d32]">性別：</span>
            <span className="font-medium text-[#ff630f]">{find_sex || "未提供"}</span>
          </li>
          <li className="text-left text-base leading-[27px]">
            <span className="font-bold text-[#604d32]">毛色：</span>
            <span className="font-medium text-[#ff630f]">{find_color || "未提供"}</span>
          </li>
          <li className="text-left text-base leading-[27px]">
            <span className="font-bold text-[#604d32]">特徵：</span>
            <span className="font-medium text-[#ff630f]">{find_feature || "未提供"}</span>
          </li>
          <li className="text-left text-base leading-[27px]">
            <span className="font-bold text-[#604d32]">遺失時間：</span>
            <span className="font-medium text-[#ff630f]">{find_time || "未提供"}</span>
          </li>
          <li className="text-left text-base leading-[27px]">
            <span className="font-bold text-[#604d32]">遺失地點：</span>
            <span className="font-medium text-[#ff630f]">{find_location || "未提供"}</span>
          </li>
        </ul>

        {(find_owner_name || find_phone) && (
          <div className="mt-2 border-t border-[#f0e2c8] pt-2">
            {find_owner_name && (
              <p className="text-left text-sm font-bold text-[#604d32]">飼主：{find_owner_name}</p>
            )}
            {find_phone && (
              <p className="text-left text-sm text-[#604d32]/80">連絡電話：{find_phone}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default FindCard;
