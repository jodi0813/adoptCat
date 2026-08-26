import { useState, useEffect } from "react";
import Maintitle from "../../components/title/Maintitle";
import FilterGroup from "./FilterGroup";
import HomeCatCard from "../../components/card/HomeCatCard";
import { getCats } from "../../services/catsService";
import { useLocation } from "react-router-dom";
import HomeCatCardSmall from "../../components/card/HomeCatCardSmaill.jsx";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";

function WaitingHome() {
  const location = useLocation();

  const initialFilters = {
    name: "",
    sex: "",
    color: "",
    old: "",
    hashtag: [],
    catFriendly: "",
    experienced: "",
  };

  const PAGE_SIZE = 9;

  const [filters, setFilters] = useState(initialFilters);
  const [searchInput, setSearchInput] = useState("");
  const [catList, setCatList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let cancelled = false;

    getCats()
      .then((cats) => {
        if (!cancelled) setCatList(cats);
      })
      .catch((err) => {
        console.error("讀取貓咪資料失敗:", err);
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newFilters = { ...initialFilters };

    if (searchParams.get("name")) newFilters.name = searchParams.get("name");
    if (searchParams.get("sex")) newFilters.sex = searchParams.get("sex");
    if (searchParams.get("color")) newFilters.color = searchParams.get("color");
    if (searchParams.get("old")) newFilters.old = searchParams.get("old");
    if (searchParams.get("catFriendly"))
      newFilters.catFriendly = searchParams.get("catFriendly");
    if (searchParams.get("experienced"))
      newFilters.experienced = searchParams.get("experienced");

    const hashtags = searchParams.getAll("hashtag");
    if (hashtags.length > 0) newFilters.hashtag = hashtags;

    setFilters(newFilters);
  }, [location.search]);

  const handleHashtagSelect = (tag) => {
    setFilters((prev) => {
      const isSelected = prev.hashtag.includes(tag);
      return {
        ...prev,
        hashtag: isSelected
          ? prev.hashtag.filter((t) => t !== tag)
          : [...prev.hashtag, tag],
      };
    });
  };

  const handleSearch = () => {
    setFilters({ ...initialFilters, name: searchInput });
    setSearchInput("");
  };

  const handleReset = () => {
    setFilters(initialFilters);
    setSearchInput("");
  };

  const toggleSingle = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: prev[field] === value ? "" : value,
    }));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const filteredCats = catList.filter((cat) => {
    if (filters.name && !cat.name.includes(filters.name)) return false;
    if (filters.sex && cat.sex !== filters.sex) return false;
    if (filters.color && cat.color !== filters.color) return false;
    if (filters.old && cat.old !== filters.old) return false;

    if (
      filters.hashtag.length > 0 &&
      !filters.hashtag.every((tag) => cat.hashtag.includes(tag))
    )
      return false;

    if (filters.catFriendly === "沒有貓咪" && cat.CatFriendly) return false;
    if (filters.catFriendly === "有其他貓" && !cat.CatFriendly) return false;

    if (filters.experienced === "沒養過貓" && cat.needExperienced) return false;
    if (filters.experienced === "有養過貓" && !cat.needExperienced)
      return false;

    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredCats.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pagedCats = filteredCats.slice(
    (safeCurrentPage - 1) * PAGE_SIZE,
    safeCurrentPage * PAGE_SIZE,
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === safeCurrentPage) return;
    setCurrentPage(page);
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

  return (
    <section className="flex flex-col lg:w-full px-[5%] py-[100px]">
      <Maintitle en="Waiting For Home" cn="帶我回家" />
      <div className="flex gap-[2%] mt-5 flex-col lg:w-full lg:mt-12.5 lg:flex-row">
        <div className="relative flex flex-col gap-[15px] rounded-xl lg:w-[30%] bg-[#fdf0c9] w-full items-start py-5 pr-0 pl-5 sm:p-[10px] md:p-[15px]  lg:items-center">
          <div className="absolute top-[-24px] right-[3px]">
            <button
              className="cursor-pointer border-none bg-none p-0 text-[0.85rem] text-[#ffa134] hover:underline"
              onClick={handleReset}
            >
              清除全部條件
            </button>
          </div>

          <div className="flex w-full items-center gap-1 flex-row lg:flex-col">
            <label className="text-left w-1/4 text-base leading-normal font-normal tracking-[2.16px] text-[#3a2c19] lg:text-center lg:w-auto">名字</label>
            <div className="flex">
              <input
                type="text"
                placeholder="貓咪名字"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="h-[30px] w-4/5 rounded-full border border-[#ffa134] bg-white px-3 py-[6px] text-[0.8rem]"
              />
              <button
                onClick={handleSearch}
                className="cursor-pointer bg-transparent p-1 text-center text-[0.8rem] leading-normal font-normal text-[#604d32]"
              >搜尋</button>
            </div>
          </div>

          <FilterGroup
            title="性別"
            options={["弟弟", "妹妹"]}
            selected={filters.sex}
            onSelect={(v) => toggleSingle("sex", v)}
          />
          <FilterGroup
            title="花色"
            options={["白", "橘", "虎斑", "黑"]}
            selected={filters.color}
            onSelect={(v) => toggleSingle("color", v)}
          />
          <FilterGroup
            title="年齡"
            options={["0~1歲", "1~3歲", "3~5歲", "5歲以上"]}
            selected={filters.old}
            onSelect={(v) => toggleSingle("old", v)}
          />
          <FilterGroup
            title="貓咪個性（可複選）"
            options={["穩定", "慢熱", "黏人", "獨立", "話多", "撒嬌"]}
            selectedList={filters.hashtag}
            isMulti
            onSelect={handleHashtagSelect}
          />
          <FilterGroup
            title="適合家庭"
            options={["沒有貓咪", "有其他貓"]}
            selected={filters.catFriendly}
            onSelect={(v) => toggleSingle("catFriendly", v)}
          />
          <FilterGroup
            title="養貓經驗"
            options={["沒養過貓", "有養過貓"]}
            selected={filters.experienced}
            onSelect={(v) => toggleSingle("experienced", v)}
          />
        </div>
        <div className="flex flex-col w-full gap-10">
          <div className="flex flex-wrap mt-5 w-full gap-[3%] md:gap-[30px] lg:mt-0 lg:w-auto">
            {loading ? (
              <div>貓咪資料載入中...</div>
            ) : error ? (
              <div>
                貓咪資料載入失敗，請稍後再試一次。
              </div>
            ) : filteredCats.length === 0 ? (
              <div>
                好可惜!沒有符合的貓咪，還是有其他貓咪在等著你唷~
              </div>
            ) : (
              pagedCats.map((cat) => (
                <HomeCatCardSmall
                  key={cat.id}
                  cat={cat}
                  id={cat.id}
                  years={cat.years}
                  name={cat.name}
                  png={cat.png}
                  hashtag={cat.hashtag}
                  sex={cat.sex}
                />
              ))
            )}
          </div>
          {!loading && !error && filteredCats.length > 0 && totalPages > 1 && (
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

export default WaitingHome;
