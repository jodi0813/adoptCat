// 一次性腳本：幫 Firestore "cats" collection 裡「已經存在」的每一筆貓咪資料，
// 補上 CatProfile 頁面貓掌評分（CatPawRating）需要的 personality 欄位。
// 用法： node scripts/backfillPersonality.mjs
//
// personality 是根據每隻貓既有的 hashtag（穩定/慢熱/黏人/獨立/話多/撒嬌）
// 與 CatFriendly 換算出來的，四個屬性各自是 0~4 的整數，代表 CatPawRating
// 四根手指裡要填滿幾根：
//   activity      活動力：文靜(0) <-> 活潑(4)
//   adaptability  適應力：低(0)   <-> 高(4)
//   sociability   社交力：不親貓(0) <-> 親貓(4)
//   dependency    依賴力：獨立(0) <-> 黏人(4)
//
// 這個腳本只會「新增/覆蓋 personality 欄位」（用 updateDoc），不會動到
// 其他既有欄位，重複執行也是安全的（同一隻貓的 hashtag 沒變，算出來的
// personality 就會一樣）。
//
// 與 seedCats.mjs / seedMoreCats.mjs 相同，使用專案既有的 firebase client
// 設定，不需要 service account key。若 Firestore 規則不允許未登入寫入，
// 請先到 Firebase Console -> Firestore -> 規則暫時開放，跑完後記得改回去。

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
const NEUTRAL = 2; // 4 根手指的中間值，沒有任何 hashtag 命中時的基準線
const MIN_LEVEL = 0;
const MAX_LEVEL = 4;

function clampLevel(value) {
  return Math.max(MIN_LEVEL, Math.min(MAX_LEVEL, Math.round(value)));
}

// 用貓咪 id 產生一個很小的、固定的 -1/0/+1 微調值，讓 hashtag 組合完全
// 相同的貓咪之間，貓掌評分不會長得一模一樣（純視覺上更自然，不影響
// 資料本身的意義）。同一隻貓每次算出來的值都一樣，是 deterministic 的。
function jitterFromId(id, salt) {
  const str = `${id}-${salt}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return (Math.abs(hash) % 3) - 1; // -1, 0, or 1
}

/**
 * 依據 hashtag 陣列與 CatFriendly 旗標，換算出四個 personality 屬性。
 * 規則：每個屬性從 NEUTRAL(2) 開始，命中對應的 hashtag 就加分或扣分，
 * 最後夾在 0~4 之間。
 */
function derivePersonality(cat) {
  const tags = Array.isArray(cat.hashtag) ? cat.hashtag : [];
  const has = (tag) => tags.includes(tag);
  const id = cat.id ?? "";

  const activity =
    NEUTRAL +
    (has("話多") ? 1 : 0) +
    (has("撒嬌") ? 1 : 0) -
    (has("穩定") ? 1 : 0) -
    (has("慢熱") ? 1 : 0) +
    jitterFromId(id, "activity");

  const adaptability =
    NEUTRAL +
    (has("穩定") ? 1 : 0) +
    (has("黏人") ? 1 : 0) -
    (has("慢熱") ? 1 : 0) -
    (has("獨立") ? 1 : 0) +
    jitterFromId(id, "adaptability");

  const sociability =
    NEUTRAL +
    (cat.CatFriendly ? 1 : 0) +
    (has("黏人") ? 1 : 0) +
    (has("撒嬌") ? 1 : 0) -
    (has("獨立") ? 1 : 0) +
    jitterFromId(id, "sociability");

  const dependency =
    NEUTRAL +
    (has("黏人") ? 2 : 0) +
    (has("撒嬌") ? 1 : 0) -
    (has("獨立") ? 2 : 0) -
    (has("穩定") ? 1 : 0) +
    jitterFromId(id, "dependency");

  return {
    activity: clampLevel(activity),
    adaptability: clampLevel(adaptability),
    sociability: clampLevel(sociability),
    dependency: clampLevel(dependency),
  };
}

async function backfill() {
  console.log(`讀取 Firestore "${CATS_COLLECTION}" collection 現有資料...`);
  const snapshot = await getDocs(collection(db, CATS_COLLECTION));
  console.log(`共 ${snapshot.size} 筆，開始補上 personality 欄位...`);

  let updated = 0;
  for (const docSnap of snapshot.docs) {
    const cat = { id: docSnap.id, ...docSnap.data() };
    const personality = derivePersonality(cat);
    await updateDoc(doc(db, CATS_COLLECTION, docSnap.id), { personality });
    console.log(
      `已更新: ${docSnap.id} - ${cat.name ?? "(未命名)"} ->`,
      personality,
    );
    updated += 1;
  }

  console.log(`全部完成！共更新 ${updated} 筆資料。`);
  process.exit(0);
}

backfill().catch((err) => {
  console.error("補寫 personality 欄位失敗：", err);
  console.error(
    "\n若錯誤是 permission-denied，請到 Firebase Console -> Firestore Database -> 規則，" +
      "暫時將 cats collection 開放寫入（例如 allow read, write: if true;），存完資料後記得改回安全的規則。"
  );
  process.exit(1);
});
