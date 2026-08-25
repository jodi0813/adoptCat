// 一次性腳本：幫 Firestore "cats" collection 裡「已經存在」的每一筆貓咪資料，
// 補上 CatProfile 頁面下半部六個區塊需要的欄位：
//   story                 背景故事
//   personalityNote       貓咪個性
//   adoptionRequirements  領養條件（字串陣列）
//   healthStatus          健康狀態
//   favorites             貓咪喜好
//   adopterMessage        領貓想說...
// 用法： node scripts/backfillProfileDetails.mjs
//
// id 為 1（搗灰）的資料使用網站原本手寫、真實存在的文案；其餘貓咪則是
// 依牠們既有的 sex / color / hashtag / CatFriendly / needExperienced /
// quotes 組合出對應的敘述句，不是隨機亂數文字，而是「這隻貓的資料如果
// 是這樣，敘述就會提到這些特徵」，每次執行結果都一樣（deterministic），
// 重複執行安全（用 updateDoc 只更新這六個欄位，不動其他資料）。
//
// 與其他 seed / backfill 腳本相同，使用專案既有的 firebase client 設定，
// 不需要 service account key。若 Firestore 規則不允許未登入寫入，請先到
// Firebase Console -> Firestore -> 規則暫時開放，寫完記得改回安全規則。

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDf28BJbpv9PIgQcjzcy00bJH2n8u__lGk",
  authDomain: "adopt-cat-82b81.firebaseapp.com",
  projectId: "adopt-cat-82b81",
  storageBucket: "adopt-cat-82b81.firebasestorage.app",
  messagingSenderId: "753136638366",
  appId: "1:753136638366:web:a0ef906a4393acfb0f1e8f",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const CATS_COLLECTION = "cats";

// id=1（搗灰）沿用網站原本首頁 CatProfile.jsx 手寫、已經是真實文案的內容，
// 不用產生器覆蓋掉。
const HANDWRITTEN_OVERRIDES = {
  1: {
    story:
      "搗灰是一隻在廢棄空地被發現的小白貓，當時牠孤零零地躲在一個紙箱裡，身上還有一點小擦傷。我們救援人員靠近時，牠沒有逃跑，只用那雙圓圓的眼睛靜靜望著大家，彷彿一直在等待著我們來救牠。",
    personalityNote:
      "搗灰個性比較膽小，剛開始雖然對陌生人會保持距離觀察，但沒有攻擊的行為，也經常喵喵叫希望得到關注，相信只要多花時間陪伴牠，牠會是一隻非常黏人的小可愛。",
    adoptionRequirements: ["23歲以上", "有穩定收入", "適合新手", "可以多貓家庭"],
    healthStatus: "結紮",
    favorites: "貓肉泥、髮圈、海綿",
    adopterMessage: "搗灰剛開始可能不會像其他親人的貓咪一樣熱情，希望領養人可以多給他一點時間適應熟悉，讓他能夠也有被愛的機會!",
  },
};

// 用貓咪 id + 一個字串當種子，算出一個固定（deterministic）的小整數，
// 拿來在同一類敘述句的好幾種寫法裡挑一種，讓同樣 hashtag 組合的貓咪
// 也不會每一句都長得一模一樣。同一隻貓每次執行結果都相同。
function pick(id, salt, options) {
  const str = `${id}-${salt}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  const index = Math.abs(hash) % options.length;
  return options[index];
}

const FAVORITE_ITEMS = ["貓肉泥", "逗貓棒", "紙箱", "貓抓板", "毛球玩具", "曬太陽的窗邊", "羽毛棒", "髮圈", "海綿", "紙袋"];

function pickFavorites(cat) {
  // 從固定的喜好清單裡，依貓咪 id 選出三樣、順序也固定，湊成跟原本
  // 搗灰資料格式一致的「A、B、C」字串。
  const pool = FAVORITE_ITEMS;
  const startIndex = Math.abs(
    `${cat.id}-favorites`.split("").reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 0),
  ) % pool.length;
  const picked = [];
  for (let i = 0; i < 3; i++) {
    picked.push(pool[(startIndex + i * 3) % pool.length]);
  }
  return picked.join("、");
}

function buildStory(cat) {
  const genderWord = cat.sex === "弟弟" ? "牠" : "她";
  const foundPlaces = [
    "在社區的機車停車場",
    "在夜市收攤後的小巷",
    "在校園的花圃旁邊",
    "在便利商店的騎樓下",
    "在公園的長椅底下",
    "在老舊公寓的樓梯間",
    "在河堤邊的草叢裡",
    "在工廠外的貨物棧板旁",
  ];
  const conditions = [
    "當時瘦弱又怕生，看到人就躲得遠遠的",
    "當時毛髮凌亂，靠在紙箱旁邊發抖",
    "當時已經好幾天沒有進食，走路搖搖晃晃",
    "當時很警戒，但沒有攻擊人的舉動",
    "當時很親人，一靠近就主動蹭了上來",
    "當時窩在一起的還有幾隻兄弟姊妹",
  ];
  const place = pick(cat.id, "story-place", foundPlaces);
  const condition = pick(cat.id, "story-condition", conditions);
  const tail = cat.CatFriendly
    ? `經過中途一段時間的照顧，${genderWord}漸漸放下戒心，也證明能跟其他貓咪好好相處，現在很期待遇到願意給${genderWord}一個家的人。`
    : `經過中途一段時間的照顧，${genderWord}漸漸放下戒心，只是目前還是希望能當家裡唯一的貓主子，現在很期待遇到願意給${genderWord}一個家的人。`;
  return `${cat.name}是一隻${cat.color}貓，${place}被發現時，${condition}。${tail}`;
}

function buildPersonalityNote(cat) {
  const tags = Array.isArray(cat.hashtag) ? cat.hashtag : [];
  const has = (tag) => tags.includes(tag);
  const genderWord = cat.sex === "弟弟" ? "牠" : "她";

  const openers = [];
  if (has("慢熱")) {
    openers.push(`${cat.name}對陌生環境跟陌生人都需要一點時間觀察，剛見面時可能會保持距離`);
  } else if (has("話多") || has("撒嬌")) {
    openers.push(`${cat.name}一點都不怕生，很快就會主動靠近、跟你討摸摸`);
  } else {
    openers.push(`${cat.name}個性算穩定，不太會因為環境改變就緊張兮兮`);
  }

  const middles = [];
  if (has("獨立")) {
    middles.push(`平常喜歡有自己的空間，不太需要人一直陪在旁邊`);
  }
  if (has("黏人")) {
    middles.push(`很喜歡待在人身邊，只要你坐下來${genderWord}多半也會湊過來`);
  }
  if (has("話多")) {
    middles.push(`話特別多，肚子餓或想討摸摸的時候都會喵喵叫提醒你`);
  }
  if (has("穩定")) {
    middles.push(`情緒起伏不大，帶去新環境或動物醫院也比較不容易緊迫`);
  }
  if (middles.length === 0) {
    middles.push(`跟人相處起來算是輕鬆自在，不會有太多讓人頭痛的小狀況`);
  }

  const closer = cat.needExperienced
    ? `建議由有養貓經驗的人來照顧，會比較知道怎麼跟${genderWord}培養默契。`
    : `即使是第一次養貓的新手，也可以慢慢跟${genderWord}培養感情。`;

  return `${openers[0]}，${pick(cat.id, "personality-middle", middles)}。${closer}`;
}

function buildAdoptionRequirements(cat) {
  const requirements = ["23歲以上", "有穩定收入"];
  requirements.push(cat.needExperienced ? "有養貓經驗" : "適合新手");
  requirements.push(cat.CatFriendly ? "可以多貓家庭" : "希望是家中唯一的貓咪");
  return requirements;
}

function buildHealthStatus(cat) {
  const extras = pick(cat.id, "health-extra", [
    "已完成基礎疫苗接種",
    "已完成三合一疫苗，健康狀況良好",
    "已驅蟲、健康檢查無異常",
    "已結紮並完成基礎疫苗",
  ]);
  return `結紮、${extras}`;
}

function buildFavorites(cat) {
  return pickFavorites(cat);
}

function buildAdopterMessage(cat) {
  if (Array.isArray(cat.quotes) && cat.quotes.length > 0) {
    // 用 id 直接對 quotes 長度取餘數（而不是雜湊字串），是為了在少數
    // 貓咪同名、quotes 陣列也完全相同的情況下（例如原始種子資料裡的
    // 三隻「豆漿」），只要 id 不同就一定會選到不同句子，訊息才不會
    // 兩隻貓一字不差。
    const numericId = Number(cat.id) || 0;
    const quote = cat.quotes[numericId % cat.quotes.length];
    return `「${quote}」${cat.name}想找一個真正屬於自己的家，希望你就是那個願意給${cat.sex === "弟弟" ? "牠" : "她"}機會的人。`;
  }
  return `${cat.name}想找一個真正屬於自己的家，希望你願意給${cat.sex === "弟弟" ? "牠" : "她"}一個機會。`;
}

function buildProfileDetails(cat) {
  const override = HANDWRITTEN_OVERRIDES[Number(cat.id)];
  if (override) return override;

  return {
    story: buildStory(cat),
    personalityNote: buildPersonalityNote(cat),
    adoptionRequirements: buildAdoptionRequirements(cat),
    healthStatus: buildHealthStatus(cat),
    favorites: buildFavorites(cat),
    adopterMessage: buildAdopterMessage(cat),
  };
}

async function backfill() {
  console.log(`讀取 Firestore "${CATS_COLLECTION}" collection 現有資料...`);
  const snapshot = await getDocs(collection(db, CATS_COLLECTION));
  console.log(`共 ${snapshot.size} 筆，開始補上背景故事等六個欄位...`);

  let updated = 0;
  for (const docSnap of snapshot.docs) {
    const cat = { id: docSnap.id, ...docSnap.data() };
    const details = buildProfileDetails(cat);
    await updateDoc(doc(db, CATS_COLLECTION, docSnap.id), details);
    console.log(`已更新: ${docSnap.id} - ${cat.name ?? "(未命名)"}`);
    updated += 1;
  }

  console.log(`全部完成！共更新 ${updated} 筆資料。`);
  process.exit(0);
}

backfill().catch((err) => {
  console.error("補寫背景故事等欄位失敗：", err);
  console.error(
    "\n若錯誤是 permission-denied，請到 Firebase Console -> Firestore Database -> 規則，" +
      "暫時將 cats collection 開放寫入（例如 allow read, write: if true;），存完資料後記得改回安全的規則。"
  );
  process.exit(1);
});
