import { useState } from "react";
import Maintitle from "../../components/title/Maintitle";
import FindCard from "./FindCard";
import useFindApi from "../../utils/api";
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

function Find() {
  const { findList, loading, error } = useFindApi();
  const [currentPage, setCurrentPage] = useState(1);

  if (error) return <p>發生錯誤：{String(error.message)}</p>;

  const findCats=findList
  .filter((row) => row["寵物別"] === "貓")
  .sort((a, b) => new Date(b["遺失時間"]) - new Date(a["遺失時間"]));

  const totalPages = Math.max(1, Math.ceil(findCats.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pagedCats = findCats.slice(
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

  return (
    <>
      <section id="findPet" className="w-full px-[7%] py-[100px]">
        <Maintitle cn="遺失協尋" en="Help Find Me"/>
        <p className="mt-4 text-center text-base text-[#604d32]/70">
          ~本站貓咪協尋資訊係依據農業部政府資料開放平臺之寵物遺失啟事資料集建置。~
        </p>

        <div className="mt-[50px] grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          <div className="col-span-full flex flex-col items-center justify-center gap-3 py-10">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#f9d176] border-t-transparent"></div>
            <p className="text-center">載入中請稍等...</p>
          </div>
        ) : (
          pagedCats.map((item, idx) => (
            <FindCard
              key={item["晶片號碼"] ?? idx}
              find_pic={item["PICTURE"] || "./images/lost_cat1.png"}
              find_name={item["寵物名"] || ""}
              find_sex={item["性別"] || ""}
              find_color={item["毛色"] || ""}
              find_feature={item["特徵"] || ""}
              find_time={item["遺失時間"] || ""}
              find_location={item["遺失地點"] || ""}
              find_owner_name={item["飼主姓名"] || ""}
              find_phone={item["連絡電話"] || ""}
            />
          ))
        )}
        </div>

        {findCats.length > 0 && totalPages > 1 && (
          <div className="mt-[50px]">
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
      </section>
    </>
  );
}
export default Find;
