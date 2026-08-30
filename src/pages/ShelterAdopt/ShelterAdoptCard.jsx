import {
  sexLabel,
  bodyTypeLabel,
  ageLabel,
  boolLabel,
  firstPhotoUrl,
  cleanText,
} from "../../utils/shelterAnimalLabels";

function ShelterAdoptCard({ animal }) {
  const photo = firstPhotoUrl(animal.album_file);
  // animal_Variety（品種）欄位回傳時常帶有一堆補齊用的空白，要先清乾淨。
  const variety = cleanText(animal.animal_Variety);
  const title = cleanText(animal.animal_title) || variety || "等待認養的貓咪";
  const animalNo = animal.animal_subid || animal.animal_id;

  return (
    <div className="flex w-full max-w-[320px] flex-col overflow-hidden rounded-[25px] bg-white shadow-[0_0_6px_rgba(0,0,0,0.1)]">
      <img
        className="h-[220px] w-full object-cover"
        src={photo || "./images/lost_cat1.png"}
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
          {animalNo && (
            <p className="text-left text-xs text-[#604d32]/60">編號：{animalNo}</p>
          )}
        </div>

        <ul>
          <li className="text-left text-base leading-[27px]">
            <span className="font-bold text-[#604d32]">性別：</span>
            <span className="font-medium text-[#ff630f]">{sexLabel(animal.animal_sex)}</span>
          </li>
          <li className="text-left text-base leading-[27px]">
            <span className="font-bold text-[#604d32]">年齡：</span>
            <span className="font-medium text-[#ff630f]">{ageLabel(animal.animal_age)}</span>
          </li>
          <li className="text-left text-base leading-[27px]">
            <span className="font-bold text-[#604d32]">體型：</span>
            <span className="font-medium text-[#ff630f]">{bodyTypeLabel(animal.animal_bodytype)}</span>
          </li>
          <li className="text-left text-base leading-[27px]">
            <span className="font-bold text-[#604d32]">毛色：</span>
            <span className="font-medium text-[#ff630f]">{cleanText(animal.animal_colour) || "未提供"}</span>
          </li>
          <li className="text-left text-base leading-[27px]">
            <span className="font-bold text-[#604d32]">絕育：</span>
            <span className="font-medium text-[#ff630f]">{boolLabel(animal.animal_sterilization)}</span>
          </li>
          <li className="text-left text-base leading-[27px]">
            <span className="font-bold text-[#604d32]">疫苗：</span>
            <span className="font-medium text-[#ff630f]">{boolLabel(animal.animal_bacterin)}</span>
          </li>
          {animal.animal_foundplace && (
            <li className="text-left text-base leading-[27px]">
              <span className="font-bold text-[#604d32]">拾獲地點：</span>
              <span className="font-medium text-[#ff630f]">{animal.animal_foundplace}</span>
            </li>
          )}
        </ul>

        {(animal.animal_caption || animal.animal_remark) && (
          <p className="text-justify text-sm leading-relaxed text-[#604d32]/80">
            {animal.animal_caption || animal.animal_remark}
          </p>
        )}

        <div className=" border-t border-[#f0e2c8] pt-2">
          <p className="text-left text-sm font-bold text-[#604d32]">
            {animal.shelter_name || "收容所資訊未提供"}
          </p>
          {animal.shelter_address && (
            <p className="text-left text-sm text-[#604d32]/80">{animal.shelter_address}</p>
          )}
          {animal.shelter_tel && (
            <p className="text-left text-sm text-[#604d32]/80">電話：{animal.shelter_tel}</p>
          )}
          {animal.animal_opendate && (
            <p className="text-left text-sm text-[#604d32]/60">開放認養日期：{animal.animal_opendate}</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default ShelterAdoptCard;
