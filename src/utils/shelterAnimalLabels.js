// 「動物認領養」(UnitId=QcbUEzN6E6DL) 這個資料集在農業資料開放平臺上查不到
// 完整的欄位代碼表，下面這份對照表原本是依照全國動物收容管理系統的慣例
// 猜的，後來拿到一筆真實回傳資料核對過，確認 animal_kind="貓"、
// animal_sex="M"、animal_bodytype="SMALL"、animal_sterilization="T"、
// animal_bacterin="F"、animal_status="OPEN" 這些猜測都對，animal_age 額外
// 補上 CHILD/ADULT 對照（原本漏掉，畫面會直接顯示英文原始值）。若之後遇到
// 沒對到的代碼，畫面會照原始值顯示，再依實際看到的值補進對照表即可。

export const TAIWAN_CITIES = [
  "臺北市", "台北市",
  "新北市",
  "桃園市",
  "臺中市", "台中市",
  "臺南市", "台南市",
  "高雄市",
  "基隆市",
  "新竹市",
  "新竹縣",
  "苗栗縣",
  "彰化縣",
  "南投縣",
  "雲林縣",
  "嘉義市",
  "嘉義縣",
  "屏東縣",
  "宜蘭縣",
  "花蓮縣",
  "臺東縣", "台東縣",
  "澎湖縣",
  "金門縣",
  "連江縣",
];

// 從收容所地址取出縣市，並統一成「臺」而不是「台」，避免同一個縣市因為
// 用字不同被拆成兩個篩選選項。
export function extractCity(address) {
  if (!address) return "";
  const found = TAIWAN_CITIES.find((city) => address.startsWith(city));
  return found ? found.replace("台", "臺") : "";
}

const SEX_LABELS = { M: "公", F: "母", N: "未知" };
export function sexLabel(value) {
  if (!value) return "未提供";
  return SEX_LABELS[String(value).toUpperCase()] ?? value;
}

const BODY_LABELS = { SMALL: "小型", MEDIUM: "中型", BIG: "大型" };
export function bodyTypeLabel(value) {
  if (!value) return "未提供";
  return BODY_LABELS[String(value).toUpperCase()] ?? value;
}

const AGE_LABELS = { CHILD: "幼年", BABY: "幼年", ADULT: "成年", SENIOR: "老年", OLD: "老年" };
export function ageLabel(value) {
  if (!value) return "未提供";
  return AGE_LABELS[String(value).toUpperCase()] ?? value;
}

// 共用給「絕育」「已施打疫苗」這類是非欄位
const BOOL_LABELS = {
  T: "是", TRUE: "是", Y: "是", "1": "是",
  F: "否", FALSE: "否", N: "否", "0": "否",
};
export function boolLabel(value) {
  if (value === undefined || value === null || value === "") return "未提供";
  return BOOL_LABELS[String(value).toUpperCase()] ?? value;
}

const STATUS_LABELS = {
  OPEN: "開放認養中",
  ADOPTED: "已被認養",
  CLOSE: "已結案",
  CLOSED: "已結案",
  DEAD: "已死亡",
};
export function statusLabel(value) {
  if (!value) return "未提供";
  return STATUS_LABELS[String(value).toUpperCase()] ?? value;
}

// 本站是貓咪領養平台，這裡用比較寬鬆的比對（中文「貓/狗」或英文
// cat/dog 都算），避免因為猜錯確切代碼而把資料濾掉。
export function isCatKind(value) {
  return /貓|cat/i.test(value ?? "");
}
export function isDogKind(value) {
  return /狗|犬|dog/i.test(value ?? "");
}

// album_file 常見是用逗號或直線分隔的多張照片網址，這裡先取第一張。
export function firstPhotoUrl(albumFile) {
  if (!albumFile) return "";
  return String(albumFile).split(/[,|]/)[0].trim();
}

// animal_Variety 這類欄位在資料庫裡是固定長度字串，回傳時後面常常補了
// 一堆空白（例如 "混種貓                 "），顯示前先清掉。
export function cleanText(value) {
  return typeof value === "string" ? value.trim() : (value ?? "");
}
