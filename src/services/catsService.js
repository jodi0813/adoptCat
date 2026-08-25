import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const CATS_COLLECTION = "cats";

/**
 * 從 Firestore 讀取所有貓咪資料。
 * 回傳的每筆資料 shape 與原本 catList.js 一致：
 * { id, years, name, sex, old, color, png, hashtag, CatFriendly, needExperienced, quotes, personality }
 */
export async function getCats() {
  const snapshot = await getDocs(collection(db, CATS_COLLECTION));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/**
 * 從 Firestore 讀取單一貓咪資料（依文件 id，也就是 catList 裡的 id）。
 * 找不到時回傳 null，讓呼叫端（例如 CatProfile）決定要顯示什麼樣的
 * 「找不到這隻貓」畫面，而不是丟出例外中斷渲染。
 */
export async function getCat(id) {
  const ref = doc(db, CATS_COLLECTION, String(id));
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;
  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}
