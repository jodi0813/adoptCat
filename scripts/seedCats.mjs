// 一次性腳本：把 src/components/card/catList.js 的資料寫入 Firestore 的 "cats" collection。
// 用法： node scripts/seedCats.mjs
//
// 使用的是專案既有的 firebase client 設定（src/firebase.js 裡的 firebaseConfig），
// 不需要 service account key。如果 Firestore 安全規則不允許未登入的寫入，
// 這個腳本會印出錯誤，屆時請到 Firebase Console -> Firestore -> 規則，
// 暫時開放寫入權限後再重新執行一次。

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import catList from "../src/components/card/catList.js";

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

async function seed() {
  console.log(`準備寫入 ${catList.length} 筆貓咪資料到 Firestore "cats" collection...`);

  for (const cat of catList) {
    const { id, ...data } = cat; // doc id 用原本的 id，資料本身不重複存 id 欄位
    const ref = doc(db, "cats", String(id));
    await setDoc(ref, data);
    console.log(`已寫入: ${id} - ${cat.name}`);
  }

  console.log("全部完成！");
  process.exit(0);
}

seed().catch((err) => {
  console.error("寫入失敗：", err);
  console.error(
    "\n若錯誤是 permission-denied，請到 Firebase Console -> Firestore Database -> 規則，" +
      "暫時將 cats collection 開放寫入（例如 allow read, write: if true;），存完資料後記得改回安全的規則。"
  );
  process.exit(1);
});
