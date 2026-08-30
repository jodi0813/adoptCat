import { useEffect, useState } from "react";
import axios from "axios";
import { isCatKind } from "./shelterAnimalLabels";

const BASE_URL = "https://data.moa.gov.tw/Service/OpenData/TransService.aspx";
const UNIT_ID = "IFJomqVzyB0i";
const LATEST_COUNT = 400;
const BATCH_SIZE = 1000; // 這隻舊版 API 是新資料排在前面，抓最前面這批通常就夠篩出最新 400 筆貓咪
const MAX_BATCHES = 20; // 安全上限，避免貓的比例太低時無限往後抓

function useFindApi() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [findList, setFindList] = useState([]);

  useEffect(() => {
    let isCancelled = false;

    async function fetchLatestCats() {
      const cats = [];
      try {
        // 這隻舊版 API 不支援可信任的伺服器端篩選（$filter 資料一多就會漏），
        // 也沒有 Page/會員機制，但它預設就是「新資料排在前面」，所以不用像
        // 新版 API 那樣去找最後一頁，只要從頭抓幾批、前端篩出貓即可。實測第
        // 一批 1000 筆裡就有 500 多筆是貓，通常一次請求就夠湊到 400 筆。
        for (let i = 0; i < MAX_BATCHES; i++) {
          const skip = i * BATCH_SIZE;
          const res = await axios.get(BASE_URL, {
            params: {
              UnitId: UNIT_ID,
              $top: BATCH_SIZE,
              $skip: skip,
            },
          });
          const batch = Array.isArray(res.data) ? res.data : [];
          cats.push(...batch.filter((row) => row["寵物別"] === "貓"));

          if (cats.length >= LATEST_COUNT) break; // 湊到需要的筆數就不用再抓了
          if (batch.length < BATCH_SIZE) break; // 資料已經抓到底了
        }

        if (!isCancelled) {
          setFindList(cats);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        if (!isCancelled) {
          setError(err);
          setLoading(false);
        }
      }
    }

    fetchLatestCats();

    return () => {
      isCancelled = true;
    };
  }, []);

  return { findList, loading, error };
}

// ---------------------------------------------------------------------
// 收容所領養（動物認領養）
// 資料來源：農業部資料開放平臺「動物認領養」資料集
// https://data.moa.gov.tw/open_detail.aspx?id=QcbUEzN6E6DL
// ---------------------------------------------------------------------
const SHELTER_UNIT_ID = "QcbUEzN6E6DL";
const SHELTER_BATCH_SIZE = 1000;
const SHELTER_MAX_BATCHES = 20; // 安全上限，避免資料量暴增時整個抓不完

export function useShelterAdoptApi() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    async function fetchAllAnimals() {
      const collected = [];
      try {
        // 這個資料集放的是「目前收容所裡的動物」，不像協尋資料一樣新的
        // 排前面就好，所以要整批分頁抓完，抓到最後一批筆數不足
        // SHELTER_BATCH_SIZE 就代表到底了。
        for (let i = 0; i < SHELTER_MAX_BATCHES; i++) {
          const skip = i * SHELTER_BATCH_SIZE;
          const res = await axios.get(BASE_URL, {
            params: {
              UnitId: SHELTER_UNIT_ID,
              $top: SHELTER_BATCH_SIZE,
              $skip: skip,
            },
          });
          const batch = Array.isArray(res.data) ? res.data : [];
          // 這個網站只做貓咪領養，狗的資料在這裡就先濾掉，
          // 後面的畫面、篩選都不用再處理狗的邏輯。
          collected.push(...batch.filter((row) => isCatKind(row.animal_kind)));

          if (batch.length < SHELTER_BATCH_SIZE) break;
        }

        if (!isCancelled) {
          setAnimals(collected);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        if (!isCancelled) {
          setError(err);
          setLoading(false);
        }
      }
    }

    fetchAllAnimals();

    return () => {
      isCancelled = true;
    };
  }, []);

  return { animals, loading, error };
}

export default useFindApi;
