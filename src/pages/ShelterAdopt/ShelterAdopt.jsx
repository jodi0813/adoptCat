import { useEffect, useMemo, useState } from "react";
import Maintitle from "../../components/title/Maintitle";
import FilterGroup from "../WaitingHome/FilterGroup";
import ShelterAdoptCard from "./ShelterAdoptCard";
import { useShelterAdoptApi } from "../../utils/api";
import {
  extractCity,
  sexLabel,
  ageLabel,
  bodyTypeLabel,
  cleanText,
} from "../../utils/shelterAnimalLabels";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";

const PAGE_SIZE = 8;

// 這裡不需要再處理動物種類的篩選條件。
const initialFilters = { city: "", sex: "", age: "", bodytype: "" };

// 從資料裡整理出「原始代碼 → 中文顯示文字」的清單，用來動態產生篩選按鈕，
// 不自己猜代碼寫死，篩選一定對得起畫面上看到的資料。部分欄位（例如
// animal_Variety）回傳時會帶補齊用的空白，這裡統一用 cleanText 清過再比對。
function buildCodedOptions(animals, field, labelFn) {
  const map = new Map();
  animals.forEach((a) => {
    const code = cleanText(a[field]);
    if (code) map.set(code, labelFn(code));
  });
  return Array.from(map.entries());
}

function ShelterAdopt() {
  const { animals, loading, error } = useShelterAdoptApi();
  const [filters, setFilters] = useState(initialFilters);
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const toggleSingle = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: prev[field] === value ? "" : value,
    }));
  };

  const handleReset = () => {
    setFilters(initialFilters);
    setKeyword("");
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, keyword]);

  const cityOptions = useMemo(() => {
    const set = new Set();
    animals.forEach((a) => {
      const city = extractCity(a.shelter_address);
      if (city) set.add(city);
    });
    return Array.from(set).sort();
  }, [animals]);

  const sexOptions = useMemo(
    () => buildCodedOptions(animals, "animal_sex", sexLabel),
    [animals],
  );

  const ageOptions = useMemo(
    () => buildCodedOptions(animals, "animal_age", ageLabel),
    [animals],
  );

  const bodyOptions = useMemo(
    () => buildCodedOptions(animals, "animal_bodytype", bodyTypeLabel),
    [animals],
  );

  const filteredAnimals = useMemo(() => {
    const kw = keyword.trim().toLowerCase();

    return animals.filter((a) => {
      if (filters.city && extractCity(a.shelter_address) !== filters.city) return false;
      if (filters.sex && cleanText(a.animal_sex) !== filters.sex) return false;
      if (filters.age && cleanText(a.animal_age) !== filters.age) return false;
      if (filters.bodytype && cleanText(a.animal_bodytype) !== filters.bodytype) return false;

      if (kw) {
        // animal_place 其實等於收容所名稱（跟 shelter_name 重複），拾獲地點
        // 要看 animal_foundplace；animal_Variety（品種）欄位常帶有補齊用的
        // 空白，這裡先 trim 再拿去比對。
        const haystack = [
          a.shelter_name,
          a.shelter_address,
          a.animal_colour,
          a.animal_caption,
          a.animal_remark,
          a.animal_foundplace,
          cleanText(a.animal_Variety),
          a.animal_title,
          a.animal_subid,
          a.animal_id,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(kw)) return false;
      }

      return true;
    });
  }, [animals, filters, keyword]);

  const totalPages = Math.max(1, Math.ceil(filteredAnimals.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pagedAnimals = filteredAnimals.slice(
    (safeCurrentPage - 1) * PAGE_SIZE,
    safeCurrentPage * PAGE_SIZE,
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === safeCurrentPage) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages = [];
    const delta = 1;
    const left = Math.max(2, safeCurrentPage - delta);
    const right = Math.min(totalPages - 1, safeCurrentPage + delta);

    pages.push(1);
    if (left > 2) pages.push("ellipsis-left");
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push("ellipsis-right");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  // 幫「代碼 → 中文」類型的篩選（性別/年齡/體型）產生 FilterGroup，
  // 畫面上看到的是中文，但實際比對、存進 filters 的還是原始代碼。
  const renderCodedFilter = (title, field, options) => {
    if (options.length === 0) return null;
    const selectedLabel = options.find(([code]) => code === filters[field])?.[1] || "";
    return (
      <div className="w-full lg:w-auto">
        <FilterGroup
          title={title}
          options={options.map(([, label]) => label)}
          selected={selectedLabel}
          onSelect={(label) => {
            const found = options.find(([, l]) => l === label);
            toggleSingle(field, found ? found[0] : "");
          }}
          align="left"
        />
      </div>
    );
  };

  if (error) return <p>發生錯誤：{String(error.message)}</p>;

  return (
    <section className="flex flex-col lg:w-full px-[5%] py-[100px]">
      <Maintitle en="Shelter Adoption" cn="收容所領養" />
      <p className="mt-4 text-center text-base text-[#604d32]/70">
        ~本頁資訊係依據農業部政府資料開放平臺之「動物認領養」資料集建置，實際認養狀態請以收容所現場公告為準。~
      </p>

      <div className="flex flex-col w-full gap-8 mt-5 lg:mt-12.5">
        <div className="relative flex w-full flex-col gap-4 rounded-xl bg-[#fdf0c9] p-5 md:p-[15px] lg:flex-row lg:flex-wrap lg:items-start lg:justify-start lg:gap-x-8 lg:gap-y-5">
          <div className="absolute top-[-24px] right-[3px]">
            <button
              className="cursor-pointer border-none bg-none p-0 text-[0.85rem] text-[#ffa134] hover:underline"
              onClick={handleReset}
            >
              清除全部條件
            </button>
          </div>

          <div className="w-full ">
            <div className="flex w-full items-center gap-1">
              <label className="whitespace-nowrap text-left text-base leading-normal font-normal tracking-[2.16px] text-[#3a2c19] lg:text-left lg:w-auto">
                關鍵字
              </label>
              <div className="flex w-full">
                <input
                  type="text"
                  placeholder="收容所 / 地址 / 品種 / 拾獲地點關鍵字"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="h-[34px] w-1/2 rounded-full border border-[#ffa134] bg-white px-3 py-[6px]"
                />
              </div>
            </div>
          </div>

          {cityOptions.length > 0 && (
            <div className="w-full lg:w-auto"> 
              <FilterGroup
                title="縣市"
                options={cityOptions}
                selected={filters.city}
                onSelect={(v) => toggleSingle("city", v)}
                align="left"
              />
            </div>
          )}

          {renderCodedFilter("性別", "sex", sexOptions)}
          {renderCodedFilter("年齡", "age", ageOptions)}
          {renderCodedFilter("體型", "bodytype", bodyOptions)}
        </div>

        <div className="flex flex-col w-full gap-10">
          <div className="grid grid-cols-1 justify-items-center gap-4 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:mt-0 lg:grid-cols-4">
            {loading ? (
              <div className="col-span-full flex flex-col items-center justify-center gap-3 py-10">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#f9d176] border-t-transparent"></div>
                <p className="text-center">載入中請稍等...</p>
              </div>
            ) : filteredAnimals.length === 0 ? (
              <div className="col-span-full text-center">
                好可惜!沒有符合條件的毛孩，換個條件再找找看吧~
              </div>
            ) : (
              pagedAnimals.map((animal, idx) => (
                <ShelterAdoptCard
                  key={`${animal.animal_id ?? idx}-${animal.animal_subid ?? ""}`}
                  animal={animal}
                />
              ))
            )}
          </div>

          {!loading && filteredAnimals.length > 0 && totalPages > 1 && (
            <div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      text=""
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(safeCurrentPage - 1);
                      }}
                      aria-disabled={safeCurrentPage === 1}
                    />
                  </PaginationItem>

                  {getPageNumbers().map((page) =>
                    typeof page === "number" ? (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          isActive={page === safeCurrentPage}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(page);
                          }}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={page}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ),
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      text=""
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(safeCurrentPage + 1);
                      }}
                      aria-disabled={safeCurrentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ShelterAdopt;
