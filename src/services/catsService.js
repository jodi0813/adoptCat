import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const CATS_COLLECTION = "cats";

/**
 * 從 Firestore 讀取所有貓咪資料。
 * 回傳的每筆資料 shape 與原本 catList.js 一致：
 * { id, years, name, sex, old, color, png, hashtag, CatFriendly, needExperienced, quotes }
 */
export async function getCats() {
  const snapshot = await getDocs(collection(db, CATS_COLLECTION));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
